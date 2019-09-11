import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

// import rootRoutes from './rootRoutes';

export const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use(rootRoutes);

app.use('/', (req, res, next) => {
  res.send('Base of app na druhou');
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});
