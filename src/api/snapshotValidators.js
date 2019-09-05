import dal from './snapshotsDAL';

async function exists(value) {
  const ex = await dal.snapshotExists(value);
  if (ex) {
    return Promise.reject(new Error('snapshot exists'));
  }
  return Promise.resolve(true);
}

module.exports = {
  exists,
};
