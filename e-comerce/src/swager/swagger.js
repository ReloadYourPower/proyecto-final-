const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Definir la configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Documentación de mi API'
    },
    servers: [
      {
        url: ''
      }
    ]
  },
  apis: [
    path.resolve(__dirname, '../routes/**/*.js'), // Patrón para incluir todos los archivos .js en la carpeta routes y sus subcarpetas
  ]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
