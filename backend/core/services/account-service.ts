import { Token } from "../entity/account";

export interface AccountService {
  register: (email: string, password: string) => Promise<string>;
  login: (email: any, password: any) => Promise<Token>;
}
