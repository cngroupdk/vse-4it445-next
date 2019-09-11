import dotenv from 'dotenv';

import { app } from './app';

dotenv.config();
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}!`);
});
