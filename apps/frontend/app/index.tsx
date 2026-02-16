import { useTheme } from "@/context/ThemeContext";
import { Heading, Body } from "@/components/Typography";
import { View } from "react-native";

export default function Index() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Heading level={2}>Dashboard</Heading>
      <Body color="textSecondary">Welcome back.</Body>
    </View>
  );
}
