import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions, Insets } from "react-native";
import { useTheme } from "../context/ThemeContext";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { Theme } from "@/config/theme";

interface LayoutProps {
  children: React.ReactNode;
  style?: any;
}

export function Layout({ children, style }: LayoutProps) {
  const { values, backgroundColor } = useTheme();
  const styles = useMemo(
    () => createStyles(values),
    [values, backgroundColor]
  );

  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg
    }
  });
};
