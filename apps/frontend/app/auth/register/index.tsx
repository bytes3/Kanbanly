import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { Button, Input } from "@/components";
import { Layout } from "@/components/Layout";
import { Heading } from "@/components/Typography";
import { Theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { values, setBackgroundColor } = useTheme();
  const styles = useMemo(() => createStyles(values), [values]);

  useEffect(() => {
    setBackgroundColor(values.colors.secondaryBackground);

    return () => {
      setBackgroundColor(values.colors.background);
    };
  }, [
    setBackgroundColor,
    values.colors.background,
    values.colors.secondaryBackground
  ]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Layout>
          <Heading level={1} color="text" style={styles.heading}>
            Create account
          </Heading>
          <Heading level={2} weight="regular" color="text">
            Thanks for choosing us
          </Heading>
          <View style={styles.inputContainer}>
            <Input placeholder="Email address" style={styles.input} />
            <Input
              isPassword={true}
              placeholder="Password"
              style={styles.input}
            />
          </View>
          <Button size="md">Create Account</Button>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      flex: 1
    },
    scrollContent: {
      flexGrow: 1
    },
    heading: {
      marginTop: 56
    },
    inputContainer: {
      flex: 1,
      gap: spacing.xl,
      justifyContent: "center"
    },
    input: {
      color: colors.text
    }
  });
};
