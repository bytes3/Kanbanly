import { ApisauceInstance } from "apisauce";
import { AuthCredentials, RegisterResponse } from "./dtos/AuthDto";
import { ServerError } from "@/errors/errors";

export const createAuthApi = (sauce: ApisauceInstance) => {
  const postRegister = async (
    payload: AuthCredentials
  ): Promise<RegisterResponse> => {
    const { data, ok } = await sauce.post<RegisterResponse>(
      "/auth/register",
      payload
    );

    if (!ok && data) {
      throw new ServerError(data.message);
    }

    if (!data) {
      throw new ServerError("Empty data");
    }

    return data;
  };

  return {
    postRegister
  };
};

export type AuthApi = ReturnType<typeof createAuthApi>;
