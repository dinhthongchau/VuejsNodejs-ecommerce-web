const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'The TH Phone Shop API',  
      version: '1.0.0',
      description: 'API for managing products, customers, carts and orders in The TH Phone Shop.',  
    },
    servers: [
      {
        url: 'http://localhost:3300',
        
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/docs/components.yaml'], 
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
