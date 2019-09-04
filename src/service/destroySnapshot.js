const {
  zfs,
} = require('zfs');

module.exports = (command) => new Promise((resolve) => {
  zfs.destroy(command.params.name, (err) => {
    if (err) {
      throw err;
    }
    resolve();
  });
});
