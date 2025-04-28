import {Hono} from 'hono'
import {IAccountService} from "@/backend/src/routes/services/account-service.ts";
import {IAccountRepository} from "@/backend/src/routes/repositories/account-repository.ts";
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