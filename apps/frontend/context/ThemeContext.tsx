import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { Theme, ThemeMode, createTheme } from "../config/theme";

interface ThemeContextType {
  values: Theme;
  themeMode: ThemeMode;
  backgroundColor: string;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setBackgroundColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}

export const ThemeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const colorScheme = useColorScheme();
  const defaultColorScheme = colorScheme ? colorScheme : "dark";

  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultColorScheme);
  const [theme, setTheme] = useState<Theme>(createTheme(defaultColorScheme));
  const [backgroundColor, setBackgroundColor] = useState<string>(
    theme.colors.background
  );

  useEffect(() => {
    setTheme(createTheme(themeMode));
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        values: theme,
        themeMode,
        backgroundColor,
        toggleTheme,
        setThemeMode,
        setBackgroundColor
      }}
    >
      <StatusBar
        barStyle={
          defaultColorScheme === "dark" ? "light-content" : "dark-content"
        }
      />
      {children}
    </ThemeContext.Provider>
  );
};
