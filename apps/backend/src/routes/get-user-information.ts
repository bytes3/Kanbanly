import { Hono } from "hono";
import { IUserService } from "../services/user-service";
import { IUserRepository } from "../repositories/user-repository";
import { IProjectRepository } from "../repositories/project-repository";

const app = new Hono();

app.get("/", async (context) => {
  const sessionInfo = context.get("jwtPayload");
  const userRepository = new IUserRepository(sessionInfo);
  const projectRepository = new IProjectRepository(sessionInfo);
  const userService = new IUserService(userRepository, projectRepository);

  const currentUser = await userService.getCurrentUser();

  context.status(200);
  return context.json(currentUser);
});

export default app;
