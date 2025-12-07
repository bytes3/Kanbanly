import { User } from "../entity/user";

export interface UserService {
  getUser(accountId: string): Promise<User | null>;
  create: (
    accountId: string,
    user: Omit<User, "id">
  ) => Promise<{ message: string; user: User }>;
}
