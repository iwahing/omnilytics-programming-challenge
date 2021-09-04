import express from 'express';

import randomRoute from './random';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Random
 *   description: The random generator API
 */

const defaultRoutes = [
  {
    path: '/random',
    route: randomRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
