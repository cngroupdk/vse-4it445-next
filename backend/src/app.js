import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import { addDbToRequest, terminateDbConnection } from './libs/connection';

import rootRoutes from './modules/rootRoutes';

export const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(addDbToRequest);

app.use(rootRoutes);

app.use(terminateDbConnection);

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});
