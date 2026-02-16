export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  secondaryBackground: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xs: number;
  };
}

const lightColors: ThemeColors = {
  primary: "#5865F2",
  secondary: "#8B5CF6",
  background: "#FAFAFA",
  secondaryBackground: "#EDEFEF",
  surface: "#F8FAFC",
  text: "#000000",
  textSecondary: "#8E8E93",
  border: "#C6C6C8",
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B"
};

const darkColors: ThemeColors = {
  primary: "#5865F2",
  secondary: "#8B5CF6",
  background: "#0A0A0A",
  secondaryBackground: "#1e1e1e",
  surface: "#1E293B",
  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  border: "#38383A",
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B"
};

export const createTheme = (mode: ThemeMode): Theme => ({
  mode,
  colors: mode === "light" ? lightColors : darkColors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xs: 16
  }
});
