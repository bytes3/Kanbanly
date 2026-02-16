import { AccountRegisterMessage } from "shared/utils";

export class ServerError extends Error {
  constructor(message: string, cause?: Error) {
    super(`Something went wrong with the server: ${message}`);
  }
}

export class UserError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
  }
}

export const AccountAlreadyExists = new UserError(
  AccountRegisterMessage.alreadyExist
);
