import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const textColor = "#FFFFFF";

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
  children,
  ...pressableProps
}: ButtonProps) {
  const { values } = useTheme();
  const isDisabled = disabled || loading;

  const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    xs: {
      container: {
        minHeight: 32,
        paddingVertical: values.spacing.xs,
        paddingHorizontal: values.spacing.sm
      },
      text: { fontSize: 12 }
    },
    sm: {
      container: {
        minHeight: 40,
        paddingVertical: values.spacing.sm,
        paddingHorizontal: values.spacing.md
      },
      text: { fontSize: 14 }
    },
    md: {
      container: {
        minHeight: 48,
        paddingVertical: values.spacing.md,
        paddingHorizontal: values.spacing.lg
      },
      text: { fontSize: 16 }
    },
    lg: {
      container: {
        minHeight: 56,
        paddingVertical: values.spacing.lg,
        paddingHorizontal: values.spacing.xl
      },
      text: { fontSize: 18 }
    }
  };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: values.colors.primary },
    secondary: { backgroundColor: values.colors.secondary }
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size].container,
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        { borderRadius: values.borderRadius.md },
        style
      ]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.text,
            sizeStyles[size].text,
            { color: textColor },
            textStyle
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    fontWeight: "600"
  },
  pressed: {
    opacity: 0.85
  },
  disabled: {
    opacity: 0.6
  }
});
