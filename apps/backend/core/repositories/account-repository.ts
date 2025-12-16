import { AccountQueryResult } from "@/backend/src/db/query-results";

export interface AccountRepository {
  create: (email: string, passward: string) => Promise<AccountQueryResult>;
  findAccountByEmail: (email: string) => Promise<AccountQueryResult | null>;
}
