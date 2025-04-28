import { Account } from "@/backend/core/entity/account";
import {AccountRepository} from "@/backend/core/repositories/account-repository";

export class IAccountRepository implements AccountRepository {
    create(email: string): Account {
        throw new Error("Not implemented.");
    }

    findAccountById(email: string): Account | null {
        throw new Error("Not implemented.");
    }
}
