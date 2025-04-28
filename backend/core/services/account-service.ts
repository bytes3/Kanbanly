import {Account} from "@/backend/core/entity/account";

export interface AccountService {
  register: (email: string) => Account
}
