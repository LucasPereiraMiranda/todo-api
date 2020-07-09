import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';

import routes from './routes';
import db from './database';

class App {
  constructor() {
    this.server = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    db.connect();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
