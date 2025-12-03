import { Hono } from "hono";
import { IAccountService } from "@/backend/src/services/account-service";
import { IAccountRepository } from "@/backend/src/repositories/account-repository";
import { loginValidator } from "@/backend/shared/validators";

const app = new Hono();

app.post("/", loginValidator, async (context) => {
  const accountRepository = new IAccountRepository();
  const accountService = new IAccountService(accountRepository);
  const data = context.req.valid("json");

  const account = await accountService.login(data.email, data.password);

  context.status(200);
  return context.json(account);
});

export default app;
