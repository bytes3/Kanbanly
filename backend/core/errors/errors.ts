import { HTTPException } from "hono/http-exception";
import { AccountRegisterMessage } from "../entity/server-message";

export class ServerError extends Error {}
export class UserError extends HTTPException {}

export class AccountAlreadyExist extends UserError {
  constructor() {
    super(400, { message: AccountRegisterMessage.alreadyExist });
  }
}
