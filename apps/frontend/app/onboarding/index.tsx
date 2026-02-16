import { StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <Text style={styles.subtitle}>
        We are putting together a guided setup to help you get your workspace
        ready.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f6f2ec"
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#2a1d14",
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#5a4a3f",
    lineHeight: 24
  }
});
