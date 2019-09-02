const amqp = require('amqplib/callback_api');
const createDataset = require('./createDataset');

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
      durable: true
    });

    channel.prefetch(1);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C.");

    channel.consume(queue, (msg) => {
      const command = JSON.parse(msg.content.toString());
      console.log(" [x] Received %s", msg.content.toString());

      switch(command.type) {
        case "createDataset":
          createDataset(command);
          break;
      }

      channel.ack(msg);
    }, {
      noAck: false
    });
  });
});