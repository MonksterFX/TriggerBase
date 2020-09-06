import { config } from './config/config';
import express from 'express';

import { createConnection, getRepository, getConnection } from 'typeorm';
import { Trigger } from './db/entity/Trigger';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import morgan from 'morgan';

// todo: to config
const MAX_EXEC_TIME = 500;
const SHEDULING_INTERVAL = 2000;
const MAX_TRIGGERS = 100;
const WORKER = 2;

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.get('/health', (req: Request, res: Response) => res.send('Hello World!'));

app.get('/task/:id', async (req: Request, res: Response) => {
  var trigger = await getConnection()
    .getRepository(Trigger)
    .find({ where: { id: req.params.id } });
  res.send(trigger);
});

app.get('/task/count', async (req: Request, res: Response) => {
  var count = await getConnection().getRepository(Trigger).count();
  res.send(`elements: ${count}`);
});

app.post('/task', async (req: Request, res: Response) => {
  // convert json to string for sqlite
  req.body.message = JSON.stringify(req.body.message);

  const trigger = await getConnection().getRepository(Trigger).create(req.body);
  const results = await getConnection().getRepository(Trigger).save(trigger);

  return res.send(results);
});

createConnection().then((val) => {
  const server = app.listen(config.get('port'));
  console.log(`Express application is up and running on port 3000`);
});

export = null;
