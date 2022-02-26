import express from 'express';
import dotenv from 'dotenv';

import connectDB from './database/db';
import routerApi from './routes';

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

routerApi(app);

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
