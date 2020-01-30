import { Project } from "../models/Project";

class ProjectController {
  static data = {};
  constructor() {}

  static getData(projectId = undefined) {
    return projectId && ProjectController.data[projectId]
      ? ProjectController.data[projectId]
      : null;
  }

  store(request, response) {
    const { id, title } = request.body;

    if (!id || !title)
      return response
        .status(400)
        .json({ error: "Os campos 'id' e 'title' são obrigatórios" });

    if (ProjectController.data[id]) {
      return response.status(400).json({
        error: "Projeto já existente!",
        content: ProjectController.data[id]
      });
    }

    ProjectController.data[id] = new Project(id, title);

    return response.json(ProjectController.data);
  }

  index(request, response) {
    return response.json(Object.values(ProjectController.data));
  }

  indexById(request, response) {
    const { id: projectId } = request.params;

    return response.json(ProjectController.data[projectId]);
  }

  updateById(request, response) {
    const { id: projectId } = request.params;
    const { title } = request.body;

    if (ProjectController.data[projectId]) {
      ProjectController.data[projectId].title = title;
    }

    return response.json(ProjectController.data[projectId]);
  }

  deleteById(request, response) {
    const { id: projectId } = request.params;

    delete ProjectController.data[projectId];

    return response.json(ProjectController.data);
  }

  storeTaskById(request, response) {
    const { title: newTask } = request.body;
    const { id: projectId } = request.params;

    if (!newTask) {
      return response
        .status(400)
        .json({ error: "O campo 'title' precisa ser preenchida" });
    }

    ProjectController.data[projectId].tasks.push(newTask);

    return response.json(ProjectController.data[projectId]);
  }
}

export default ProjectController;
