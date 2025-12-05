import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import registerRoute from "./src/routes/register-route";
import { UserError } from "./core/errors/errors";
import { HTTPException } from "hono/http-exception";
import loginRoute from "./src/routes/login-route";

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

  console.error(`[ERROR USER RESPOND] [${parsedDate}]:`, err.stack);
  if (err.cause instanceof Error) {
    console.error(`[ERROR CAUSE] [${parsedDate}]:`, err.cause?.message);
  }

  const result = {
    message: err.message
  };

  return c.json(result, 500);
});

app.use(logger());

app.use(
  "/home/*",
  jwt({
    secret: Bun.env.SECRET_JWT as string
  })
);

app.get("/home/page", async (c) => {
  return c.text("You are authorized");
});

app.route("/auth/register", registerRoute);
app.route("/auth/login", loginRoute);

export default app;
