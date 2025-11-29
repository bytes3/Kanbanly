import { AccountRepository } from "@/backend/core/repositories/account-repository";
import { AccountService } from "@/backend/core/services/account-service";
import { AccountRegisterMessage } from "@/backend/core/entity/server-message";
import { HTTPException } from "hono/http-exception";
import { AccountAlreadyExist, ServerError } from "@/backend/core/errors/errors";
import bcrypt from "bcryptjs";

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
    } catch (error) {
      if (error instanceof AccountAlreadyExist) {
        throw error;
      }

      throw new ServerError(AccountRegisterMessage.serverError, {
        cause: error
      });
    }
  }
}
