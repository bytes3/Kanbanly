import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

function App() {
  const router = useRouter();
  const handleOnPress = () => {
    router.navigate("/auth/github");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={handleOnPress}>
          Login with Github
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
  },
  buttonText: {
    padding: 20,
  },
});

export default App;
