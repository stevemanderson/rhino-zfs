const {
  zfs
} = require('zfs');

module.exports = (command) => {
  return new Promise((resolve) => {
    zfs.destroy(command.params.name, (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
};