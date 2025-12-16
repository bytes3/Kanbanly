import { Hono } from "hono";
import { IAccountRepository } from "../repositories/account-repository";
import { IAccountService } from "../services/account-service";
import { loginValidator } from "shared/validators";

const app = new Hono();

app.post("/", loginValidator, async (context) => {
  const accountRepository = new IAccountRepository();
  const accountService = new IAccountService(accountRepository);
  const data = context.req.valid("json");

  const token = await accountService.login(data.email, data.password);

  context.status(200);
  return context.json({ token });
});

export default app;
