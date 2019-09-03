const {
  zfs
} = require('zfs');

module.exports = (command) => {
  return new Promise((resolve) => {
    console.log(` [x] Creating dataset ${command.params.name}`)
    zfs.create(command.params.name, (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      resolve();
    });
  });
};