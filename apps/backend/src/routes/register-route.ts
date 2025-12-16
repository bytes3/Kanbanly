import { Hono } from "hono";
import { IAccountService } from "../services/account-service";
import { IAccountRepository } from "../repositories/account-repository";
import { registerValidator } from "shared/validators";

const app = new Hono();

app.post("/", registerValidator, async (context) => {
  const accountRepository = new IAccountRepository();
  const accountService = new IAccountService(accountRepository);
  const data = context.req.valid("json");

  const message = await accountService.register(data.email, data.password);

  context.status(200);
  return context.json({ message });
});

export default app;
