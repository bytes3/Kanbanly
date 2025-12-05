import { User } from "../entity/user";

export interface UserService {
  getUser(accountId: string): Promise<User | null>;
  create: (user: User) => Promise<{ message: string; user: User }>;
}
