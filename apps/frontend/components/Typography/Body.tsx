import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TextAlign, TypographyColor, TypographyWeight } from "./types";

type BodySize = "xs" | "sm" | "md" | "lg";

export interface BodyProps {
  size?: BodySize;
  weight?: TypographyWeight;
  color?: TypographyColor;
  align?: TextAlign;
  numberOfLines?: number;
  style?: TextStyle;
  children: React.ReactNode;
}

const size_styles: Record<BodySize, TextStyle> = {
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 13, lineHeight: 18 },
  md: { fontSize: 15, lineHeight: 22 },
  lg: { fontSize: 17, lineHeight: 26 }
};

const weight_styles: Record<TypographyWeight, TextStyle> = {
  regular: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  semibold: { fontWeight: "600" },
  bold: { fontWeight: "700" }
};

export function Body({
  size = "md",
  weight = "regular",
  color = "text",
  align = "left",
  numberOfLines,
  style,
  children
}: BodyProps) {
  const { values } = useTheme();

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        size_styles[size],
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
    letterSpacing: 0.1
  }
});
