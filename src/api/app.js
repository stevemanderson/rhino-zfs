import express from 'express';
import datasetsRouter from './datasetsRouter';
import snapshotsRouter from './snapshotsRouter';

const app = express();
const port = 3000;

app.use('/datasets', datasetsRouter);
app.use('/snapshots', snapshotsRouter);

app.listen(port, () => console.log(`Example app listing on port ${port}!`));
