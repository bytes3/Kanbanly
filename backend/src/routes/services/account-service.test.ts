import {AccountRepository} from "@/backend/core/repositories/account-repository.ts";
import {mock} from "jest-mock-extended"
import {Account} from "@/backend/core/entity/account.ts";
import { IAccountService } from "./account-service";

describe('Register register', () => {
    const account: Account = {
        id: "some-email",
        email: "some-id",
    }

    it('should register the account successfully', () => {
        const accountRepository = mock<AccountRepository>()
        const accountService = new IAccountService(accountRepository)
        accountRepository.findAccountById.mockReturnValue(null)
        accountRepository.create.mockReturnValue(account)

        const result = accountService.register(account.email);

        expect(result).toBe(account)
    });

    it("should throw when account existing", () => {
        const accountRepository = mock<AccountRepository>()
        const accountService = new IAccountService(accountRepository)
        accountRepository.findAccountById.mockReturnValue(account)

        expect(() => {
            accountService.register(account.email)
        }).toThrow(new Error("Account is already existing"))
    })
});
