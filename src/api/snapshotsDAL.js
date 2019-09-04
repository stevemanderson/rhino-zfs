const { zfs } = require('../../node_modules/zfs');
const Snapshot = require('./snapshot');
const createSS = require('./createSnapshot');
const destroySS = require('./destroySnapshot');

function getSnapshots() {
  return new Promise((resolve) => {
    zfs.list_snapshots((err, fields, data) => {
      resolve(data.map((x) => new Snapshot(x[0], x[1], x[2], x[3], x[4], x[5])));
    });
  });
}

function createSnapshot(name) {
  return new Promise((resolve) => {
    createSS(name);
    resolve();
  });
}

function destroySnapshot(name) {
  return new Promise((resolve) => {
    destroySS(name);
    resolve();
  });
}

module.exports = {
  getSnapshots,
  createSnapshot,
  destroySnapshot,
};
