import { Router } from "express";
import ProjectController from "./controllers/ProjectController";
import { checkProjectExists } from "./middlewares";

const routes = Router();
const projectController = new ProjectController();
let count = 0;

routes.post("/projects", projectController.store);
routes.get("/projects", projectController.index);
routes.get("/projects/:id", checkProjectExists, projectController.indexById);
routes.put("/projects/:id", checkProjectExists, projectController.updateById);
routes.delete(
  "/projects/:id",
  checkProjectExists,
  projectController.deleteById
);
routes.post(
  "/projects/:id/tasks",
  checkProjectExists,
  projectController.storeTaskById
);

export default routes;
