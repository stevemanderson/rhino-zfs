import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import datasetsRouter from './datasetsRouter';
import snapshotsRouter from './snapshotsRouter';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/datasets', datasetsRouter);
app.use('/snapshots', snapshotsRouter);

app.listen(port, () => console.log(`Example app listing on port ${port}!`));
