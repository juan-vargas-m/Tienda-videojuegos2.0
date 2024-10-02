import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import gameRoutes from './src/routes/gameRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig.js';

const app = express();

app.use(express.json());

// Rutas de la API
app.use('/users', userRoutes);
app.use('/games', gameRoutes);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
