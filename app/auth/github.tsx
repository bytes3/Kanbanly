import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, View, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "http://localhost:3000/authorize",
  tokenEndpoint: "http://localhost:3000/token",
};

const redirectUri = makeRedirectUri({
  scheme: "kanbanly",
})

export default function Index() {
  const [authTokens, setAuthTokens] = useState({
    access_token: "",
    refresh_token: "",
  })

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "clientid",
      usePKCE: true,
      redirectUri: redirectUri,
    },
    discovery,
  )

  useEffect(() => {
    const exchange = async (exchangeTokenReq: any) => {
      console.log("Exchange Token Request: ", exchangeTokenReq)
      console.log("Code Verifier: ", request?.codeVerifier)
      try {
        const exchangeTokenResponse = await exchangeCodeAsync(
          {
            clientId: "kanbanly",
            code: exchangeTokenReq,
            redirectUri: redirectUri,
            extraParams: {
              code_verifier: request?.codeVerifier ?? '',
            },
          },
          discovery,
        )
        console.log("Exchange Token Response: ", exchangeTokenResponse)

        setAuthTokens({
          access_token: exchangeTokenResponse.accessToken,
          refresh_token: exchangeTokenResponse.refreshToken ?? '',
        })
      } catch (error) {
        console.error("error", error)
      }
    }

    if (response) {
      if (response.type === 'error') {
        console.error(
          "Authentication error",
          response.params.error_description || "something went wrong",
        )
      }
      if (response.type === "success") {
        exchange(response.params.code)
      }
    }
  }, [request, response])

  return (
    <View className="flex flex-1 justify-center items-center">
      <View>
        <Button
          title="login"
          onPress={() => {
            promptAsync()
          }}
        />
        <Text>AuthTokens: {JSON.stringify(authTokens)}</Text>
      </View>
    </View>
  )
}
