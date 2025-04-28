import {AccountRepository} from "@/backend/core/repositories/account-repository.ts";
import {Account} from "@/backend/core/entity/account.ts";
import {AccountService} from "@/backend/core/services/account-service.ts";

export class IAccountService implements AccountService {
    private accountRepository: AccountRepository;

    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository
    }

    register(email: string): Account {
        const account = this.accountRepository.findAccountById(email)

        if (account) {
            throw new Error("Account is already existing")
        }

        return this.accountRepository.create(email)
    }
}
