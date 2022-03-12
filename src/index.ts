import { cors, dotenv, express } from './modules';

import connectDB from './database/db';
import routerApi from './routes';

dotenv.config();

// Crear app
const app = express();
app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Rutas predeterminadas
routerApi(app);

// Escuchar servidor corriendo en puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
