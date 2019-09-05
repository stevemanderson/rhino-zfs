const amqp = require('amqplib/callback_api');
const createDataset = require('./createDataset');
const destroyDataset = require('./destroyDataset');
const datasetExists = require('./datasetExists');
const createSnapshot = require('./createSnapshot');
const destroySnapshot = require('./destroySnapshot');
const snapshotExists = require('./snapshotExists');

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) {
    throw err;
  }

  conn.createChannel((err2, channel) => {
    if (err2) {
      throw err2;
    }

    const queue = 'rhino_zfs_commands';

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1);

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C.', queue);

    channel.consume(queue, (msg) => {
      const command = JSON.parse(msg.content.toString());
      console.log(' [x] Received %s', msg.content.toString());

      switch (command.type) {
        case 'createDataset':
          datasetExists(command).then((exists) => {
            if (!exists) {
              createDataset(command).then(() => {
                console.log(` [x] Dataset ${command.params.name} created`);
                channel.ack(msg);
              });
            } else {
              console.log(` [x] Dataset ${command.params.name} already exists`);
              channel.ack(msg);
            }
          });
          break;
        case 'destroyDataset':
          datasetExists(command).then((exists) => {
            if (exists) {
              destroyDataset(command).then(() => {
                console.log(` [x] Dataset ${command.params.name} destroyed`);
                channel.ack(msg);
              });
            } else {
              console.log(` [x] Dataset ${command.params.name} does not exist`);
              channel.ack(msg);
            }
          });
          break;
        case 'createSnapshot':
          snapshotExists(command).then((exists) => {
            if (!exists) {
              createSnapshot(command).then(() => {
                console.log(` [x] Snapshot ${command.params.name} created`);
                channel.ack(msg);
              });
            } else {
              console.log(` [x] Snapshot ${command.params.name} already exists`);
              channel.ack(msg);
            }
          });
          break;
        case 'destroySnapshot':
          snapshotExists(command).then((exists) => {
            if (exists) {
              destroySnapshot(command).then(() => {
                console.log(` [x] Snapshot ${command.params.name} destroyed`);
                channel.ack(msg);
              });
            } else {
              console.log(` [x] Snapshot ${command.params.name} does not exist`);
              channel.ack(msg);
            }
          });
          break;
        default:
          throw new Error(`${command.type} is not a command.`);
      }
    }, {
      noAck: false,
    });
  });
});
