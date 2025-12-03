import { Hono } from "hono";
import { IAccountService } from "@/backend/src/services/account-service";
import { IAccountRepository } from "@/backend/src/repositories/account-repository";
import { registerValidator } from "@/backend/shared/validators";

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
