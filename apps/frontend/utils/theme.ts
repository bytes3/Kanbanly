import { Theme, ThemeColors, ThemeMode } from "../types/theme.types";

const lightColors: ThemeColors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  background: "#FFFFFF",
  surface: "#F2F2F7",
  text: "#000000",
  textSecondary: "#8E8E93",
  border: "#C6C6C8",
  error: "#FF3B30",
  success: "#34C759",
  warning: "#FF9500",
};

const darkColors: ThemeColors = {
  primary: "#0A84FF",
  secondary: "#5E5CE6",
  background: "#000000",
  surface: "#1C1C1E",
  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  border: "#38383A",
  error: "#FF453A",
  success: "#32D74B",
  warning: "#FF9F0A",
};

export const createTheme = (mode: ThemeMode): Theme => ({
  mode,
  colors: mode === "light" ? lightColors : darkColors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
});