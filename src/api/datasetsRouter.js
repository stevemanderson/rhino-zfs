import express from 'express';
import dal from './datasetsDAL';

const router = express.Router();

router.get('/', (req, res) => {
  dal.getDatasets().then((datasets) => {
    res.send(datasets);
  }).catch((error) => {
    console.log(error);
    res.statusCode = 500;
    res.send([]);
  });
});

router.post('/', (req, res) => {
  console.log(`Sent ${req.body.name}`);
  dal.createDataset(req.body.name).then(() => {
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
  dal.destroyDataset(req.body.name).then(() => {
    res.statusCode = 200;
    res.send();
  }).catch((error) => {
    console.log(error);
    res.statusCode = 500;
    res.send([]);
  });
});


module.exports = router;
