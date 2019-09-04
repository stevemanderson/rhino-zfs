const amqp = require('amqplib/callback_api');

module.exports = (snapshotName) => {
  amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
      throw err;
    }

    conn.createChannel((err2, channel) => {
      if (err2) {
        throw err2;
      }

      const queue = 'rhino_zfs_commands';
      const msg = {
        type: 'createSnapshot',
        params: {
          name: snapshotName,
        },
      };

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
        persistent: true,
      });

      setTimeout(() => {
        conn.close();
      }, 500);
    });
  });
};