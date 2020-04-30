import { Router } from 'express';
import UserConstroller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import validator from './app/middlewares/validation';

const routes = new Router();

routes.post('/users', validator.userCreateValidator, UserConstroller.store);
routes.post(
  '/sessions',
  validator.sessionCreateValidator,
  SessionController.store
);

routes.use(authMiddleware);

routes.put('/users', UserConstroller.update);

routes.use(validator.errors());
export default routes;
