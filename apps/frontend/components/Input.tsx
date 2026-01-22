import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type InputSize = "xs" | "sm" | "md" | "lg";

export interface InputProps extends TextInputProps {
  size?: InputSize;
  error?: string;
  isDisabled?: boolean;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

export function Input({
  size = "md",
  error,
  containerStyle,
  style,
  editable = true,
  isDisabled = false,
  isPassword = false,
  ...inputProps
}: InputProps) {
  const { values } = useTheme();

  const sizeStyles: Record<InputSize, TextStyle> = {
    xs: {
      fontSize: 12,
      paddingVertical: values.spacing.xs,
      paddingHorizontal: values.spacing.sm,
      minHeight: 32
    },
    sm: {
      fontSize: 14,
      paddingVertical: values.spacing.sm,
      paddingHorizontal: values.spacing.md,
      minHeight: 40
    },
    md: {
      fontSize: 16,
      paddingVertical: values.spacing.md,
      paddingHorizontal: values.spacing.lg,
      minHeight: 48
    },
    lg: {
      fontSize: 18,
      paddingVertical: values.spacing.lg,
      paddingHorizontal: values.spacing.xl,
      minHeight: 56
    }
  };

  return (
    <View style={containerStyle}>
      <TextInput
        editable={editable}
        placeholderTextColor={values.colors.textSecondary}
        secureTextEntry={isPassword}
        style={[
          styles.base,
          sizeStyles[size],
          {
            backgroundColor: values.colors.surface,
            borderColor: error ? values.colors.error : values.colors.border,
            borderRadius: values.borderRadius.md,
            color: values.colors.text
          },
          isDisabled && styles.disabled,
          style
        ]}
        {...inputProps}
      />
      {error ? (
        <Text style={[styles.errorText, { color: values.colors.error }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1
  },
  disabled: {
    opacity: 0.6
  },
  errorText: {
    marginTop: 4,
    fontSize: 12
  }
});
