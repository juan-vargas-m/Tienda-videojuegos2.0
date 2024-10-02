// config/swaggerConfig.js

import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Videojuegos Store API',
      version: '1.0.0',
      description: 'API para gestionar una tienda de videojuegos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Game: {
          type: 'object',
          required: ['id', 'nombre', 'consola', 'cantidad'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único del videojuego',
            },
            nombre: {
              type: 'string',
              description: 'Nombre del videojuego',
            },
            consola: {
              type: 'string',
              description: 'Consola para la cual es el videojuego',
            },
            cantidad: {
              type: 'integer',
              description: 'Cantidad disponible en stock',
            },
          },
          example: {
            id: '1',
            nombre: 'FIFA 21',
            consola: 'PS4',
            cantidad: 10,
          },
        },
        User: {
          type: 'object',
          required: ['id', 'nombre', 'email'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único del usuario',
            },
            nombre: {
              type: 'string',
              description: 'Nombre del usuario',
            },
            email: {
              type: 'string',
              description: 'Email del usuario',
            },
          },
          example: {
            id: '1',
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
