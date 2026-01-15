import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

export function LoadingComponent() {
  const theme = useTheme();
  const { colors } = theme.theme;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
