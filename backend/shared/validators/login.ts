import { z } from "zod";
import { sValidator } from "@hono/standard-validator";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(64)
});

export const loginValidator = sValidator("json", loginSchema, (result, c) => {
  if (!result.success) {
    const { error } = result;

    let errors = {};
    const messages = error.forEach(
      (value: { path: string; message: string }) => {
        errors[value.path] = value.message;

        return value;
      }
    );

    return c.json(messages, 400);
  }
});
