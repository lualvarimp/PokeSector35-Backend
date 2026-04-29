import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import './models/index.js';  // ← Añade esta línea

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas (las añadiremos después)

// START SERVER
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada');

    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🎮 Servidor PokéSector listo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar:', error);
  }
};

startServer();