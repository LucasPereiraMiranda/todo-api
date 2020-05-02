import { Router } from 'express';
import UserConstroller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ListController from './app/controllers/ListController';
import TaskController from './app/controllers/TaskController';

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
routes.get(
  '/lists/:id',
  validatorMiddleware.listShowValidator,
  ListController.show
);
routes.put(
  '/lists/:id',
  validatorMiddleware.listUpdateValidator,
  ListController.update
);
routes.delete(
  '/lists/:id',
  validatorMiddleware.listDeleteValidator,
  ListController.delete
);
routes.post(
  '/lists/:listId/tasks',
  validatorMiddleware.taskCreateValidator,
  TaskController.store
);
routes.put(
  '/lists/:listId/tasks/:taskId',
  validatorMiddleware.taskUpdateValidator,
  TaskController.update
);
routes.delete(
  '/lists/:listId/tasks/:taskId',
  validatorMiddleware.taskDeleteValidator,
  TaskController.delete
);
routes.get(
  '/lists/:listId/tasks',
  validatorMiddleware.taskIndexValidator,
  TaskController.index
);

routes.use(validatorMiddleware.errors());

export default routes;
