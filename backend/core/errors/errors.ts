import { AccountRegisterMessage } from "../entity/server-message";

export class ServerError extends Error {}

export class AccountAlreadyExist extends Error {
  constructor() {
    super(AccountRegisterMessage.alreadyExist);
  }
}
