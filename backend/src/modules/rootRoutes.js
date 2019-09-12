import { Router } from 'express';
import { DB_CONNECTION_KEY } from '../libs/connection';

const router = Router();

router.use('/poky', (req, res, next) => {
  res.send('Base of app na druhou');
});

router.use('/test', async (req, res, next) => {
  console.log('This is test of DB');
  const dbConnection = req[DB_CONNECTION_KEY];
  const poky = await dbConnection.query('SELECT 1 as val');
  console.log('Data poky', poky);
  console.log('DB finished');
  res.send('DB test');
});

export default router;
