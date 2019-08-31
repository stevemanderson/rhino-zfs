import express from 'express';
import bodyParser from 'body-parser';
import datasetsRouter from './datasetsRouter';
import snapshotsRouter from './snapshotsRouter';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/datasets', datasetsRouter);
app.use('/snapshots', snapshotsRouter);

app.listen(port, () => console.log(`Example app listing on port ${port}!`));
