import express from 'express';
import dal from './snapshotsDAL';

const router = express.Router();

router.get('/', (req, res) => {
  dal.getSnapshots().then((snapshots) => {
    res.send(snapshots);
  }).catch((error) => {
    console.log(error);
    res.statusCode = 500;
    res.send([]);
  });
});

module.exports = router;
