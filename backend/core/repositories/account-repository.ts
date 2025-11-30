import { Account } from "@/backend/core/entity/account";

export interface AccountRepository {
  create: (email: string, passward: string) => Promise<Account>;
  findAccountByEmail: (email: string) => Promise<Account | null>;
}
