import { Context, Hono } from "hono";
import { jwt, sign, verify } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import bcrypt from "bcryptjs";
import { HTTPException } from "hono/http-exception";
import { getCookie, setCookie } from "hono/cookie";

// Specify the variable types to infer the `c.get('jwtPayload')`:
type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

const temp_users: Record<string, any> = {};
const secretjwt =
  "D3A73413F88F90B1AF255C16A6C1CE3E0696479808949D5AA1B11EC1BB69AF1C";

app.use(
  "/auth/*",
  jwt({
    secret: secretjwt,
  }),
);

app.get("/auth/page", async (c) => {
  return c.text("You are authorized");
});

/** POST /auth/register */
app.post("/register", async (ctx: Context): Promise<Response> => {
  // const prisma = new PrismaClient({
  //   datasources: { db: { url: ctx.env.PRISMA_PROXY_URL } },
  // });

  const {
    username,
    password,
  }: {
    username: string;
    password: string;
  } = await ctx.req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await prisma.users.create({
    //     data: {
    //         username,
    //         password: hashedPassword,
    //     },
    // });
    const user = temp_users[username];

    if (!!user) {
      throw new HTTPException(400, { message: "User already exists" });
    }

    temp_users[username] = {
      username,
      password: hashedPassword,
    };

    ctx.status(200);

    return ctx.json({ data: temp_users[username] });
  } catch (error) {
    throw new HTTPException(500, {
      message: error?.message ?? "Something went really wrong",
    });
  }
});

/** POST /auth/login */
app.post("/login", async (ctx: Context): Promise<Response> => {
  // const prisma = new PrismaClient({
  //     datasources: { db: { url: ctx.env.PRISMA_PROXY_URL } },
  // });

  const { username, password } = await ctx.req.json();

  // const user = await prisma.users.findUnique({ where: { username } });
  const user = temp_users[username];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HTTPException(401, {
      message: !user ? "Invalid username" : "Invalid password",
    });
  }

  const token = await sign({ id: user.id, username }, secretjwt);

  ctx.header("Access-Control-Allow-Credentials", "true");
  ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  ctx.header("Access-Control-Allow-Headers", "*");
  ctx.header("Access-Control-Allow-Origin", ctx.env.CLIENT_ORIGIN_URL);

  setCookie(ctx, "token", token, {
    expires: new Date(new Date().setDate(new Date().getDate() + 7)),
    secure: true,
    sameSite: "None",
    httpOnly: true,
  });

  ctx.status(200);

  return ctx.json({ data: { token } });
});

export default app;
