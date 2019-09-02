const { zfs } = require('zfs');
const Dataset = require('./dataset');
const createDS = require('./createDataset');
const destroyDS = require('./destroyDataset');

function getDatasets() {
  return new Promise((resolve) => {
    zfs.list((err, fields, data) => {
      resolve(data.map((x) => new Dataset(x[0], x[1], x[2], x[3], x[4], x[5])));
    });
  });
}

function createDataset(name) {
  return new Promise((resolve) => {
    createDS(name);
    resolve();
  });
}

function destroyDataset(name) {
  return new Promise((resolve) => {
    destroyDS(name);
    resolve();
  });
}

module.exports = {
  getDatasets,
  createDataset,
  destroyDataset,
};
