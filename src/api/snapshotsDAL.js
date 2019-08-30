const { zfs } = require('../../node_modules/zfs');
const Snapshot = require('./snapshot');

function getSnapshots() {
  return new Promise((resolve) => {
    zfs.list_snapshots((err, fields, data) => {
      resolve(data.map((x) => new Snapshot(x[0], x[1], x[2], x[3], x[4], x[5])));
    });
  });
}

module.exports = {
  getSnapshots,
};
