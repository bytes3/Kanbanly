import { z } from "zod";
import { countries } from "./counties";

export const CountrySchema = z
  .string()
  .min(2)
  .max(2)
  .refine((value) => countries[value] === value, {
    error: `Country name does not exist`
  });

export type Country = z.infer<typeof CountrySchema>;
