import { z } from "zod";
import { sValidator } from "@hono/standard-validator";
import { getValidationErrorMessages } from "../utils/validator-utils";

export const boardSchema = z.object({
  name: z.string().max(16),
  listNames: z.array(z.string())
});

export const projectSchema = z.object({
  name: z.string().max(16),
  description: z.string().max(64),
  board: boardSchema
});

export const projectValidator = sValidator(
  "json",
  projectSchema,
  (result, c) => {
    if (!result.success) {
      const errors = getValidationErrorMessages(result.error);

      return c.json(errors, 400);
    }
  }
);
