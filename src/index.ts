import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import connectDB from './database/db';
import routerApi from './routes';

dotenv.config();

// Crear app
const app = express();

// Conectar a la base de datos
connectDB();

// Rutas predeterminadas
routerApi(app);

// Configurar sesiones de usuario
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET || '',
    // key: process.env.KEY || '',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_MONGO }),
  })
);

// Escuchar servidor corriendo en puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
