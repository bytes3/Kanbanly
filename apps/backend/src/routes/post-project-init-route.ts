import { Hono } from "hono";
import { projectValidator } from "shared/validators";
import { IProjectRepository } from "../repositories/project-repository";
import { IProjectService } from "../services/project-service";

const app = new Hono();

app.post("/", projectValidator, async (context) => {
  const data = context.req.valid("json");
  const sessionInfo = context.get("jwtPayload");

  const projectRepository = new IProjectRepository(sessionInfo);
  const projectService = new IProjectService(projectRepository);

  const result = await projectService.create({
    name: data.name,
    description: data.description,
    board: data.board
  });

  context.status(200);
  return context.json(result);
});

export default app;
