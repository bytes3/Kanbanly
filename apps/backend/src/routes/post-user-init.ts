import { Hono } from "hono";
import { IUserService } from "../services/user-service";
import { IUserRepository } from "../repositories/user-repository";
import { userCreationValidator } from "shared/validators";
import type { SessionInfo } from "core/entity";
import { IProjectRepository } from "../repositories/project-repository";

const app = new Hono();

app.post("/", userCreationValidator, async (context) => {
  const data = context.req.valid("json");
  const sessionInfo: SessionInfo = context.get("jwtPayload");

  const userRepository = new IUserRepository(sessionInfo);
  const projectRepository = new IProjectRepository(sessionInfo);
  const accountService = new IUserService(userRepository, projectRepository);

  const result = await accountService.create(sessionInfo.accountId, {
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    dateBirth: data.dateBirth.toString(),
    country: data.country,
    gender: data.gender,
    city: data.city,
    state: data.state,
    completedOnboarding: false
  });

  context.status(200);
  return context.json(result);
});

export default app;
