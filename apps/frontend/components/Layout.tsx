import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LayoutProps {
  children: React.ReactNode;
  style?: any;
}

const { width } = Dimensions.get("window");

export function Layout({ children, style }: LayoutProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    },
    isTablet && styles.tabletContainer,
    isDesktop && styles.desktopContainer,
    style
  ];

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  tabletContainer: {
    maxWidth: 1024,
    alignSelf: "center",
    width: "100%"
  },
  desktopContainer: {
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%"
  }
});

