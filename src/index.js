import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import gameSlotRoutes from './routes/gameSlotRoutes.js';
import capturedPokemonRoutes from './routes/capturedPokemonRoutes.js';
import rankingRoutes from './routes/rankingRoutes.js';
import replayRoutes from './routes/replayRoutes.js';
import { errorHandler } from './middlewares/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug');

// Swagger UI - Documentación interactiva
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para obtener la especificación Swagger en JSON
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', gameSlotRoutes);
app.use('/api/users', capturedPokemonRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/users', replayRoutes);

// Ruta raíz con información básica
app.get('/', (req, res) => {
  res.json({
    name: 'PokéSector 35 API',
    version: '1.0.0',
    description: 'Backend API para juego retro de captura de Pokémon',
    documentation: 'http://localhost:3000/api-docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      slots: '/api/users/:userId/slots',
      pokedex: '/api/users/:id/pokedex',
      ranking: '/api/ranking',
      replays: '/api/users/:userId/replays'
    }
  });
});

// Manejo de errores global
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 PokéSector 35 Backend ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 Swagger UI disponible en http://localhost:${PORT}/api-docs`);
});

export default app;