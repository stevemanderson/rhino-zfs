const {
  zfs,
} = require('zfs');

module.exports = (command) => new Promise((resolve) => {
  console.log(` [x] Creating snapshot ${command.params.name}`);
  zfs.snapshot(command.params.name, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    resolve();
  });
});
