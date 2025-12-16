import type { Account } from "../entity/";

export interface AccountRepository {
  create: (email: string, passward: string) => Promise<Account>;
  findAccountByEmail: (email: string) => Promise<Account | null>;
}
