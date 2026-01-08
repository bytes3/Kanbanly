import { Hono } from "hono";
import { IProjectRepository } from "../repositories/project-repository";
import { IProjectService } from "../services/project-service";

const app = new Hono();

app.get("/", async (context) => {
  const sessionInfo = context.get("jwtPayload");

  const projectRepository = new IProjectRepository(sessionInfo);
  const projectService = new IProjectService(projectRepository);

  const result = await projectService.getDefaultProject();

  context.status(200);
  return context.json(result);
});

export default app;
