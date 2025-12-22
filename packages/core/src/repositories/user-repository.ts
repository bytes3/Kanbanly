import type { User } from "../entity";

export interface UserRepository {
  create: (accountId: string, user: Omit<User, "id">) => Promise<User>;
  updateCompletedOnboarding(): Promise<boolean>;
  getCurrentUser(): Promise<User | null>;
  findUserByAccountId: (accountId: string) => Promise<User | null>;
  findUserByUsername: (username: string) => Promise<User | null>;
}
