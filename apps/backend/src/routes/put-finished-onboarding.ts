import { Hono } from "hono";
import { IUserService } from "../services/user-service";
import { IUserRepository } from "../repositories/user-repository";
import { IProjectRepository } from "../repositories/project-repository";

const app = new Hono();

app.put("/", async (context) => {
  const sessionInfo = context.get("jwtPayload");
  const userRepository = new IUserRepository(sessionInfo);
  const projectRepository = new IProjectRepository(sessionInfo);
  const userService = new IUserService(userRepository, projectRepository);

  await userService.updateOnboardingStatus();

  context.status(204);
  return context.body(null);
});

export default app;
