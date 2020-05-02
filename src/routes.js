import { Router } from 'express';
import UserConstroller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ListController from './app/controllers/ListController';
import authMiddleware from './app/middlewares/auth';
import validatorMiddleware from './app/middlewares/validation';

const routes = new Router();

routes.post(
  '/users',
  validatorMiddleware.userCreateValidator,
  UserConstroller.store
);
routes.post(
  '/sessions',
  validatorMiddleware.sessionCreateValidator,
  SessionController.store
);

routes.use(authMiddleware);

routes.put(
  '/users',
  validatorMiddleware.userUpdateValidator,
  UserConstroller.update
);

routes.get(
  '/lists',
  validatorMiddleware.listIndexValidator,
  ListController.index
);

routes.post(
  '/lists',
  validatorMiddleware.listCreateValidator,
  ListController.store
);

routes.use(validatorMiddleware.errors());
export default routes;
