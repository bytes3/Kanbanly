export interface ServerMessage {
  ok: string;
  serverError: string;
}

export const AccountRegisterMessage: ServerMessage & {
  alreadyExist: string;
} = {
  ok: "Account is registered successfully",
  serverError: "Account couln't be created",
  alreadyExist: "The account already exist"
};

export const AccountLoginMessage: ServerMessage & {
  wrongPassword: string;
  wrongEmail: string;
} = {
  ok: "Login success",
  serverError: "Failed to login",
  wrongPassword: "Wrong password. Try another",
  wrongEmail: "Email doesn't exist"
};

export const UserCreationMessage: ServerMessage & { alreadyExist: string } = {
  ok: "User created successfully",
  serverError: "Failed to create user.",
  alreadyExist: "User already exist"
};

export const UserGetMessage = {
  serverError: "Failed to get user"
};
