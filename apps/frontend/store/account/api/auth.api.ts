import { ApisauceInstance } from "apisauce";
import { AuthCredentials, RegisterResponse } from "./dtos/AuthDto";
import { createNetworkAppError } from "@/errors/errors";

export const createAuthApi = (sauce: ApisauceInstance) => {
  const postRegister = async (
    payload: AuthCredentials
  ): Promise<RegisterResponse> => {
    const response = await sauce.post<RegisterResponse>(
      "/auth/register",
      payload
    );

    const appNetworkError = createNetworkAppError(response);

    if (appNetworkError) {
      throw appNetworkError;
    }

    return response.data!;
  };

  return {
    postRegister
  };
};

export type AuthApi = ReturnType<typeof createAuthApi>;
