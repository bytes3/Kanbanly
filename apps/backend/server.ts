import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { UserError } from "./src/errors/errors";
import { HTTPException } from "hono/http-exception";
import registerRoute from "./src/routes/register-route";
import loginRoute from "./src/routes/login-route";
import postUserInitRoute from "./src/routes/post-user-init";
import postProjectInitRoute from "./src/routes/post-project-init-route";
import getDefaultProjectRoute from "./src/routes/get-project-default";
import getProjectBoardsRoute from "./src/routes/get-board";
import getProjectBoardsListRoute from "./src/routes/get-board-list";
import getProjectBoardsListItemsRoute from "./src/routes/get-board-list-items";
import putFinishedOnboardingRoute from "./src/routes/put-finished-onboarding";
import getUserInformationRoute from "./src/routes/get-user-information";

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

app.route("/app/user/init", postUserInitRoute);
app.route("/app/user/onboarding-finished", putFinishedOnboardingRoute);
app.route("/app/user/information", getUserInformationRoute);

app.route("/app/project-init", postProjectInitRoute);
app.route("/app/project/default-project", getDefaultProjectRoute);
app.route("/app/project/:projectId/boards", getProjectBoardsRoute);
app.route(
  "/app/project/:projectId/board/:boardId/lists",
  getProjectBoardsListRoute
);
app.route(
  "/app/project/:projectId/board/:boardId/list/:boardListId/items",
  getProjectBoardsListItemsRoute
);

export default app;
