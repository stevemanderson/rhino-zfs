const {
  zfs
} = require('zfs');

module.exports = (command) => {
  return new Promise((resolve) => {
    zfs.list((err, fields, data) => {
      if (err) {
        throw err;
      }
      resolve(data.filter((item) => item[0] === command.params.name).length > 0);
    });
  });
};