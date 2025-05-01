import { Account } from "@/backend/core/entity/account";

export interface AccountRepository {
  create: (email: string) => Account;
  findAccountById: (email: string) => Account | null;
}
