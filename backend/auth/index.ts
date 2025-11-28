import { Context, Hono } from "hono";
import { jwt, sign } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import bcrypt from "bcryptjs";
import { HTTPException } from "hono/http-exception";
import { setCookie } from "hono/cookie";
import postgres from "postgres";

// Specify the variable types to infer the `c.get('jwtPayload')`:
type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

interface Userpass {
  id?: number;
  username: string;
  password_hash: string;
  created_at?: string;
}
const sql = postgres(Bun.env.DATABASE_URL as string);

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

const getUser = async (username: string): Promise<Userpass> => {
  const existingUser = await sql<[Userpass]>`
        SELECT * FROM user_auth
        WHERE username = ${username};`;

  console.log("existingUser:", existingUser);

  return existingUser[0];
};

/** POST /auth/register */
app.post("/register", async (ctx: Context): Promise<Response> => {
  const {
    username,
    password,
  }: {
    username: string;
    password: string;
  } = await ctx.req.json();

  try {
    const existingUser = await getUser(username);
    if (!!existingUser) {
      throw new HTTPException(400, {
        message: `Username already exists for ${username}`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usernew: Userpass = { username, password_hash: hashedPassword };

    const resultInseration: Userpass[] = await sql`
      INSERT INTO user_auth ${sql(usernew, "username", "password_hash")}
      returning *;
    `;

    if (resultInseration.length <= 0) {
      throw new HTTPException(500, { message: "Something went wrong." });
    }

    console.log("userResult:", resultInseration[0]);

    ctx.status(200);

    return ctx.json({ data: resultInseration });
  } catch (error: any) {
    throw new HTTPException(500, {
      message: "ERROR: " + (error?.message ?? "Something went really wrong"),
    });
  }
});

/** POST /auth/login */
app.post("/login", async (ctx: Context): Promise<Response> => {
  const { username, password } = await ctx.req.json();

  const existingUser = await getUser(username);
  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.password_hash))
  ) {
    throw new HTTPException(401, {
      message: !existingUser ? "Invalid username" : "Invalid password",
    });
  }

  const token = await sign({ id: existingUser.id, username }, secretjwt);

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
