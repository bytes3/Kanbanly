import { Account } from "@/backend/core/entity/account";
import { ServerMessage } from "../entity/server-message";

export interface AccountService {
  register: (email: string, password: string) => Promise<string>;
}
