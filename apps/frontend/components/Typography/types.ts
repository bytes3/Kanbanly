import { TextStyle } from "react-native";
import { ThemeColors } from "../../config/theme";

export type TypographyColor = keyof Pick<
  ThemeColors,
  | "text"
  | "textSecondary"
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning"
>;

export type TypographyWeight = "regular" | "medium" | "semibold" | "bold";

export type TextAlign = NonNullable<TextStyle["textAlign"]>;
