import { AccountRepository } from "@/backend/core/repositories/account-repository";
import { AccountService } from "@/backend/core/services/account-service";
import {
  AccountLoginMessage,
  AccountRegisterMessage
} from "@/backend/core/entity/server-message";
import {
  AccountAlreadyExist,
  AccountLoginFailure,
  AccountNotFound,
  MissingEnviermentVariable,
  ServerError,
  UserError
} from "@/backend/core/errors/errors";
import bcrypt from "bcryptjs";
import { Token } from "@/backend/core/entity/account";
import { sign } from "hono/jwt";

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

      throw new ServerError(AccountRegisterMessage.serverError, error);
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
        existingAccount.password_hash
      );

      if (!isPasswordCorrect) {
        throw new AccountLoginFailure();
      }

      const secretJWT = process.env.SECRET_JWT;
      if (!secretJWT) {
        throw new MissingEnviermentVariable("SECRET_JWT");
      }

      return await sign({ id: existingAccount.id, email }, secretJWT);
    } catch (error: any) {
      if (
        error instanceof AccountNotFound ||
        error instanceof AccountLoginFailure ||
        error instanceof MissingEnviermentVariable
      ) {
        throw error;
      }

      throw new ServerError(AccountLoginMessage.serverError, error);
    }
  }
}
