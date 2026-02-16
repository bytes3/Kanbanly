import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { registerSchema } from "shared/validators";
import { Button, Input } from "@/components";
import { Layout } from "@/components/Layout";
import { Heading } from "@/components/Typography";
import { Theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { KanbanlyStore } from "@/store/setup";
import { useRouter } from "expo-router";

export default function Index() {
  const { values, setBackgroundColor } = useTheme();
  const { navigate } = useRouter();
  const styles = useMemo(() => createStyles(values), [values]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { accountStore } = useStore<KanbanlyStore>();

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

  const handleSubmit = async () => {
    const { error } = registerSchema.safeParse({ email, password });
    const fieldErrors: Record<string, string> = {};

    if (error) {
      for (const issue of error.issues) {
        fieldErrors[issue.path.toString()] = issue.message;
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const { userDidRegister, errorMessage } = await accountStore.register({
      email,
      password
    });

    if (!userDidRegister) {
      fieldErrors["email"] =
        errorMessage ?? "Something went wrong with the server";

      setErrors(fieldErrors);
      return;
    }

    navigate("/auth/register/success");
  };

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
            <Input
              placeholder="Email address"
              style={styles.input}
              onChangeText={setEmail}
              error={errors["email"] && errors["email"]}
            />
            <Input
              isPassword={true}
              placeholder="Password"
              style={styles.input}
              onChangeText={setPassword}
              error={errors["password"] && errors["password"]}
            />
          </View>
          <Button size="md" onPress={handleSubmit}>
            Create Account
          </Button>
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
