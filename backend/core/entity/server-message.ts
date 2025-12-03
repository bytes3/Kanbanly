export interface ServerMessage {
  ok: string;
  serverError: string;
}

export const AccountRegisterMessage: ServerMessage & {
  alreadyExist: string;
} = {
  ok: "Account is registered successfully",
  serverError: "Account couln't be created. There was an issue with the server",
  alreadyExist: "The account already exist"
};

export const AccountLoginMessage: ServerMessage & {
  wrongPassword: string;
  wrongEmail: string;
} = {
  ok: "Login success",
  serverError: "Failed to login. There was an issue with the server",
  wrongPassword: "Wrong password. Try another",
  wrongEmail: "Email doesn't exist"
};
