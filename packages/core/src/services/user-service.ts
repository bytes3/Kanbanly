import type { User } from "../entity";

export interface UserService {
  getUser(accountId: string): Promise<User | null>;
  getCurrentUser(): Promise<User>;
  create: (
    accountId: string,
    user: Omit<User, "id">
  ) => Promise<{ message: string; user: User }>;
  updateOnboardingStatus: () => Promise<boolean>;
}
