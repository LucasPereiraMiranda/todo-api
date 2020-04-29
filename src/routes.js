import { Router } from 'express';

import UserConstroller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserConstroller.store);
routes.post('/sessions', SessionController.store);

routes.put('/users', UserConstroller.update);

export default routes;
