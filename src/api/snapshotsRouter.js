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

router.post('/', (req, res) => {
  console.log(`Sent ${req.body.name}`);
  dal.createSnapshot(req.body.name).then(() => {
    res.statusCode = 201;
    res.send();
  }).catch((error) => {
    console.log(error);
    res.statusCode = 500;
    res.send([]);
  });
});

router.delete('/', (req, res) => {
  console.log(`Sent ${req.body.name}`);
  dal.destroySnapshot(req.body.name).then(() => {
    res.statusCode = 200;
    res.send();
  }).catch((error) => {
    console.log(error);
    res.statusCode = 500;
    res.send([]);
  });
});

module.exports = router;
