const swaggerAutogen = require('swagger-autogen')();
const outputFile = './build/public/swagger.json';
const endpointsFiles = ['./build/index.js'];

const doc = {
  info: {
    version: 'v1', // by default: '1.0.0'
    title: 'API - Banco de Teste', // by default: 'REST API'
    description: 'API para Banco de Teste', // by default: ''
  },
  host: 'http://localhost:4201', // by default: 'localhost:3000'
  url: '/swagger.json',
  basePath: '', // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  securityDefinitions: {}, // by default: empty object (Swagger 2.0)
  definitions: {}, // by default: empty object
  components: {} // by default: empty object (OpenAPI 3.x)
};

swaggerAutogen(outputFile, endpointsFiles, doc);