import { Hono } from "hono";
import { IUserService } from "../services/user-service";
import { IUserRepository } from "../repositories/user-repository";
import { userCreationValidator } from "@/backend/shared/validators/user-creation";

const app = new Hono();

app.post("/", userCreationValidator, async (context) => {
  const userRepository = new IUserRepository();
  const accountService = new IUserService(userRepository);

  const data = context.req.valid("json");
  const { id: accountId } = context.get("jwtPayload");

  const result = await accountService.create(accountId, {
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
