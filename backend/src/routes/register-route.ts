import {Hono} from 'hono'
import {IAccountService} from "@/backend/src/services/account-service";
import {IAccountRepository} from "@/backend/src/repositories/account-repository";
import {registerValidator} from "@/backend/core/validators";

const app = new Hono()

app.put('/', registerValidator, (context) => {
    const accountRepository = new IAccountRepository()
    const accountService = new IAccountService(accountRepository)
    const data = context.req.valid("json")

    const account = accountService.register(data.email)

    return context.json(account)
})

export default app