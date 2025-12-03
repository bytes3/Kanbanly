import { z } from "zod";
import { sValidator } from "@hono/standard-validator";
import { getValidationErrorMessages } from "../utils/validator-utils";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(64)
});

export const registerValidator = sValidator(
  "json",
  registerSchema,
  (result, c) => {
    if (!result.success) {
      const errors = getValidationErrorMessages(result.error);

      return c.json(errors, 400);
    }
  }
);
