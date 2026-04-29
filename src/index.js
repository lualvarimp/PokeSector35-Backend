import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database.js';
import './models/index.js'; 

import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/index.js';


// ========== CREAR LA APP PRIMERO ==========
const app = express();

// ========== MIDDLEWARES ==========
app.use(cors());
app.use(express.json());

// ========== RUTAS ==========
app.use('/api', routes);

// ========== ERROR HANDLER ==========
app.use(errorHandler);

// ========== ARRANCAR SERVIDOR ==========
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Base de datos conectada en puerto 5432')

    await sequelize.sync({ force: false })
    console.log('✅ Modelos sincronizados')

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`🚀 Servidor PokeSector corriendo en http://localhost:${PORT}`)
    });

  } catch (error) {
    console.error('❌ Error al iniciar:', error)
  }
}

startServer()