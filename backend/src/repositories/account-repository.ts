import { Account } from "@/backend/core/entity/account";
import { AccountRepository } from "@/backend/core/repositories/account-repository";

export class IAccountRepository implements AccountRepository {
  create(email: string): Account {
    return { id: "123", email };
  }

  findAccountById(email: string): Account | null {
    return null;
  }
}
