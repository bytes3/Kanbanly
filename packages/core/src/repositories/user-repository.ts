import type { User } from "../entity";

export interface UserRepository {
  create: (accountId: string, user: Omit<User, "id">) => Promise<User>;
  findUserByAccountId: (accountId: string) => Promise<User | null>;
  findUserByUsername: (username: string) => Promise<User | null>;
}
