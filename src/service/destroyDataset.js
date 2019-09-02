const {
  zfs
} = require('zfs');

module.exports = (command) => {
  return new Promise((resolve) => {
    console.log(` [x] Destroying dataset ${command.params.name}`)
    zfs.destroy(command.params.name, (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
};