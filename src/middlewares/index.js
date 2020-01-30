import ProjectController from "../controllers/ProjectController";

let requestNumber = 0;

export const countRequest = (req, res, next) => {
  requestNumber++;
  console.log(`${requestNumber} requisições realizadas nessa sessão`);
  return next();
};

export const checkProjectExists = (req, res, next) => {
  const { id: projectId } = req.params;

  const project = ProjectController.getData(projectId);

  if (!project) {
    return res.status(401).json({
      error: "Id de projeto inexistente! Certifique-se que esteja cadastrado"
    });
  }
  return next();
};
