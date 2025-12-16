import { z } from "zod";
import { sValidator } from "@hono/standard-validator";
import { getValidationErrorMessages } from "../utils/validator-utils";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(64)
});

export const loginValidator = sValidator("json", loginSchema, (result, c) => {
  if (!result.success) {
    const errors = getValidationErrorMessages(result.error);

    return c.json(errors, 400);
  }
});
