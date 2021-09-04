import express from 'express';
import jsend from 'jsend';
import cors from 'cors';
import morgan from './middleware/morgan';
import router from './routes/router';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from './utils/config';
import logger from './utils/logger';

const app = express();

app.use(express.json());

app.use(morgan);

app.use(jsend.middleware);

app.use(cors());

const options = {
  definition: {
    info: {
      title: 'Ommnilytics Programmming Challenge',
      version: '1.0.0',
      description: 'Backend Solution Ommnilytics Programmming Challenge',
      contact: {
        name: 'Isaac John Wahing',
        email: 'isaacjohnwahing@gmail.com',
      },
    },
    basePath: '/v1',
  },
  apis: ['./src/routes/random/index.ts'],
};

const specs = swaggerJsdoc(options);

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/v1', router);

export default app;
