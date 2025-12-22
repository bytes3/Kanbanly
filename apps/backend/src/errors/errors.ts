import { HTTPException } from "hono/http-exception";
import {
  AccountLoginMessage,
  AccountRegisterMessage,
  ProjectMessage,
  UserCreationMessage,
  UserOnboardingStatusMessage
} from "../utils/server-message";

export class ServerError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
  }
}
export class UserError extends HTTPException {}

export class MissingEnviermentVariable extends ServerError {
  constructor(envName: string) {
    super(`Missing variable for ${envName}`);
  }
}

export class AccountAlreadyExist extends UserError {
  constructor() {
    super(400, { message: AccountRegisterMessage.alreadyExist });
  }
}

export class AccountLoginFailure extends UserError {
  constructor() {
    super(401, { message: AccountLoginMessage.wrongPassword });
  }
}

export class AccountNotFound extends UserError {
  constructor() {
    super(401, { message: AccountLoginMessage.wrongEmail });
  }
}

export class UserAlreadyExist extends UserError {
  constructor() {
    super(400, { message: UserCreationMessage.alreadyExist });
  }
}

export class UsernameAlreadyExists extends UserError {
  constructor() {
    super(400, { message: UserCreationMessage.usernameAlreadyExist });
  }
}

export class UserNotFound extends UserError {
  constructor() {
    super(403, {
      message: UserOnboardingStatusMessage.userDidNotFinishedOnboarding
    });
  }
}

export class ProjectNotFound extends UserError {
  constructor() {
    super(403, {
      message: ProjectMessage.doesntExist
    });
  }
}
