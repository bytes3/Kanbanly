import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, StyleSheet } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "http://192.168.1.131:3000/authorize",
  tokenEndpoint: "http://192.168.1.131:3000/token",
};

export default function GitHub() {
  // const [authTokens, setAuthTokens] = useState({
  //   access_token: "",
  //   refresh_token: "",
  // });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "Ov23lir35gvAzMMD4Xyi",
      usePKCE: true,
      redirectUri: makeRedirectUri({
        scheme: "kanbanly",
      }),
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(code);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync().then((r) => console.log("promtAsync:", r));
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
