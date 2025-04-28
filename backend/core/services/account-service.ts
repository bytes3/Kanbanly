import {Account} from "@/backend/core/entity/account.ts";

export interface AccountService {
  register: (email: string) => Account
}
