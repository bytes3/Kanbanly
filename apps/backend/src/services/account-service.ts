import bcrypt from "bcryptjs";
import type { SessionInfo, Token } from "core/entity";
import type { AccountRepository } from "core/repositories";
import type { AccountService } from "core/services";
import { sign } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";
import {
  AccountAlreadyExist,
  AccountLoginFailure,
  AccountNotFound,
  MissingEnviermentVariable
} from "../errors/errors";
import { handleServerError } from "../utils/handleServerErrors";
import {
  AccountLoginMessage,
  AccountRegisterMessage
} from "../utils/server-message";

export class IAccountService implements AccountService {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  async register(email: string, password: string): Promise<string> {
    try {
      const account = await this.accountRepository.findAccountByEmail(email);

      if (account) {
        throw new AccountAlreadyExist();
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.accountRepository.create(email, hashedPassword);

      return AccountRegisterMessage.ok;
    } catch (error: any) {
      if (error instanceof AccountAlreadyExist) {
        throw error;
      }

      handleServerError(AccountRegisterMessage.serverError, error);
    }
  }

  async login(email: any, password: any): Promise<Token> {
    try {
      const existingAccount =
        await this.accountRepository.findAccountByEmail(email);

      if (!existingAccount) {
        throw new AccountNotFound();
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingAccount.passwordHash
      );

      if (!isPasswordCorrect) {
        throw new AccountLoginFailure();
      }

      const secretJWT = process.env.SECRET_JWT;
      if (!secretJWT) {
        throw new MissingEnviermentVariable("SECRET_JWT");
      }

      const sessionInfo: SessionInfo & JWTPayload = {
        accountId: existingAccount.id,
        email: existingAccount.email,
        createdAt: existingAccount.createdAt
      };

      return await sign(sessionInfo, secretJWT);
    } catch (error: any) {
      if (
        error instanceof AccountNotFound ||
        error instanceof AccountLoginFailure
      ) {
        throw error;
      }

      handleServerError(AccountLoginMessage.serverError, error);
    }
  }
}
