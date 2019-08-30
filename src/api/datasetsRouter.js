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

module.exports = router;
