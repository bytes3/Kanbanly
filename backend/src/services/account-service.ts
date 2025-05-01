import {AccountRepository} from "@/backend/core/repositories/account-repository";
import {Account} from "@/backend/core/entity/account";
import {AccountService} from "@/backend/core/services/account-service";

export class IAccountService implements AccountService {
    private accountRepository: AccountRepository;

    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository
    }

    register(email: string): Account {
        const account = this.accountRepository.findAccountById(email)

        if (account) {
            return account
        }

        return this.accountRepository.create(email)
    }
}
