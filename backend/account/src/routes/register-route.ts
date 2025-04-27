import {Hono} from 'hono'
import {registerValidator} from "../../../core/src/validators/index.ts";

const app = new Hono()

app.put('/', registerValidator, (context) => {
    const data = context.req.valid("json")

    return context.json(data)
})

export default app