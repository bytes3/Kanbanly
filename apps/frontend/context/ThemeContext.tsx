import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, ThemeMode } from "../types/theme.types";
import { createTheme } from "../utils/theme";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [theme, setTheme] = useState<Theme>(createTheme("light"));

  useEffect(() => {
    setTheme(createTheme(themeMode));
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        toggleTheme,
        setThemeMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

