import { z } from "zod";
import { sValidator } from "@hono/standard-validator";
import { getValidationErrorMessages } from "../utils/validator-utils";
import { CountrySchema } from "./country";

export const userCreationSchema = z.object({
  username: z.string().min(5).max(24),
  firstName: z.string().min(3).max(24),
  lastName: z.string().min(3).max(24),
  dateBirth: z.iso.datetime(),
  gender: z.string().optional(),
  country: CountrySchema,
  city: z.string().min(2).max(2),
  state: z.string().optional()
});

export const userCreationValidator = sValidator(
  "json",
  userCreationSchema,
  (result, c) => {
    if (!result.success) {
      const errors = getValidationErrorMessages(result.error);

      return c.json(errors, 400);
    }
  }
);
