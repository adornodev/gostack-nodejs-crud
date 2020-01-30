import express from "express";
import cors from "cors";
import routes from "./routes";
import { countRequest } from "./middlewares";

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(countRequest);
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
