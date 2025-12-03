import { z } from "zod";
import { sValidator } from "@hono/standard-validator";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(64)
});

export const registerValidator = sValidator(
  "json",
  registerSchema,
  (result, c) => {
    if (!result.success) {
      const { error } = result;
      const messages = error.map((value) => value.message);

      return c.json({ message: messages }, 400);
    }
  }
);
