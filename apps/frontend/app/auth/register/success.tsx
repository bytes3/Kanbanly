import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components";
import { Body, Heading } from "@/components/Typography";
import { Theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";

export default function RegisterSuccessScreen() {
  const { values } = useTheme();
  const styles = useMemo(() => createStyles(values), [values]);
  const { navigate } = useRouter();

  return (
    <Layout style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.ring}>
          <View style={styles.ringInner}>
            <View style={styles.check} />
          </View>
        </View>
        <Heading level={1} align="center">
          Account created
        </Heading>
        <Body align="center" color="textSecondary" style={styles.subtitle}>
          You are all set. Let us guide you through your first board in minutes.
        </Body>
      </View>
      <View style={styles.actions}>
        <Button size="lg" onPress={() => navigate("/onboarding")}>
          Start onboarding
        </Button>
      </View>
    </Layout>
  );
}

const createStyles = (theme: Theme) => {
  const { colors, spacing, borderRadius } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingTop: spacing.xl
    },
    hero: {
      alignItems: "center",
      gap: spacing.md
    },
    subtitle: {
      marginTop: spacing.xs,
      paddingHorizontal: spacing.md
    },
    actions: {
      paddingBottom: spacing.lg
    },
    ring: {
      width: 124,
      height: 124,
      borderRadius: 62,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8
    },
    ringInner: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.success
    },
    check: {
      width: 34,
      height: 18,
      borderLeftWidth: 6,
      borderBottomWidth: 6,
      borderColor: "#FFFFFF",
      transform: [{ rotate: "-45deg" }],
      borderBottomLeftRadius: borderRadius.sm
    }
  });
};
