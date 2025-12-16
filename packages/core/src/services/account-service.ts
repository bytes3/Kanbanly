import type { Token } from "../entity";

export interface AccountService {
  register: (email: string, password: string) => Promise<string>;
  login: (email: any, password: any) => Promise<Token>;
}
