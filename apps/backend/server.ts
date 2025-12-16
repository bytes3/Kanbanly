import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { UserError } from "./src/errors/errors";
import { HTTPException } from "hono/http-exception";
import registerRoute from "./src/routes/register-route";
import loginRoute from "./src/routes/login-route";
import userInitRoute from "./src/routes/post-user-init";

const app = new Hono();

app.onError((err, c) => {
  if (err instanceof UserError) {
    const { message, status } = err as HTTPException;
    const result = {
      message: message
    };

    return c.json(result, status);
  }

  const currentDate = new Date(Date.now());
  const parsedDate = currentDate.toLocaleString("en-GB");

  console.error(`[ERROR USER RESPONSE] [${parsedDate}]:`, err.message);
  if (err.cause instanceof Error) {
    console.error(`[ERROR CAUSE] [${parsedDate}]:`, err.cause?.stack);
  }

  const result = {
    message: err.message
  };

  return c.json(result, 500);
});

app.use(logger());

app.use(
  "/app/*",
  jwt({
    secret: Bun.env.SECRET_JWT as string
  })
);

app.get("/app/auth-test", async (c) => {
  return c.text("You are authorized");
});

app.route("/auth/register", registerRoute);
app.route("/auth/login", loginRoute);

app.route("/app/user-init", userInitRoute);
export default app;
