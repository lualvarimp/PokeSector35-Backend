import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database.js';
import './models/index.js'; 

import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// Error handler (debe ir al final)
app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada');
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor PokeSector corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar:', error);
  }
};

startServer();