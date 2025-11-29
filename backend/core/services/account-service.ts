export interface AccountService {
  register: (email: string, password: string) => Promise<string>;
}
