import {Account} from "@/backend/core/entity/account.ts";

export interface AccountRepository {
    create: (email: string) => Account
    findAccountById: (email: string) => Account | null
}
