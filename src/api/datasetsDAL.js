const { zfs } = require('zfs');
const Dataset = require('./dataset');

function getDatasets() {
  return new Promise((resolve) => {
    zfs.list((err, fields, data) => {
      resolve(data.map((x) => new Dataset(x[0], x[1], x[2], x[3], x[4], x[5])));
    });
  });
}

module.exports = {
  getDatasets,
};
