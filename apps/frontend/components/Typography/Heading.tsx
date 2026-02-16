import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TypographyWeight, TypographyColor, TextAlign } from "./types";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps {
  level?: HeadingLevel;
  weight?: TypographyWeight;
  color?: TypographyColor;
  align?: TextAlign;
  numberOfLines?: number;
  style?: TextStyle;
  children: React.ReactNode;
}

const level_styles: Record<HeadingLevel, TextStyle> = {
  1: { fontSize: 32, lineHeight: 40 },
  2: { fontSize: 28, lineHeight: 36 },
  3: { fontSize: 24, lineHeight: 32 },
  4: { fontSize: 20, lineHeight: 28 },
  5: { fontSize: 18, lineHeight: 24 },
  6: { fontSize: 16, lineHeight: 22 }
};

const weight_styles: Record<TypographyWeight, TextStyle> = {
  regular: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  semibold: { fontWeight: "600" },
  bold: { fontWeight: "700" }
};

export function Heading({
  level = 2,
  weight = "semibold",
  color = "text",
  align = "left",
  numberOfLines,
  style,
  children
}: HeadingProps) {
  const { values } = useTheme();

  return (
    <Text
      accessibilityRole="header"
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        level_styles[level],
        weight_styles[weight],
        { color: values.colors[color], textAlign: align },
        style
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0.2
  }
});
