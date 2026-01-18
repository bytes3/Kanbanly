import { config } from "@gluestack-ui/config";

export const gluestackUIConfig = {
  ...config,
  tokens: {
    ...config.tokens,
    colors: {
      ...config.tokens.colors,
      primary0: "#F1F5FF",
      primary50: "#E1ECFF",
      primary100: "#C7DAFF",
      primary200: "#A2C0FF",
      primary300: "#7BA6FF",
      primary400: "#518CFF",
      primary500: "#2E6EF0",
      primary600: "#1E56C2",
      primary700: "#17439A",
      primary800: "#102F6B",
      primary900: "#0A1E42",
      backgroundLight0: "#F9FAFB",
      backgroundLight50: "#F3F4F6",
      borderLight200: "#E3E8EF",
      textLight500: "#4B5563"
    },
    fonts: {
      ...config.tokens.fonts,
      heading: "System",
      body: "System"
    },
    fontSizes: {
      ...config.tokens.fontSizes,
      "2xs": 11,
      xs: 13
    },
    space: {
      ...config.tokens.space,
      "4.5": 18,
      "5.5": 22
    },
    radii: {
      ...config.tokens.radii,
      "2xl": 18,
      "3xl": 28
    }
  }
};
