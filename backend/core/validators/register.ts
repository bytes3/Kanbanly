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
      return c.text("Invalid email!\n", 400);
    }
  }
);
