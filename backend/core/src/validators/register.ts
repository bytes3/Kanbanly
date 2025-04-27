import {z} from 'zod'
import {zValidator} from '@hono/zod-validator'

export const registerSchema = z.object({
  email: z.string().email(),
})

export const registerValidator = zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
        return c.text('Invalid email!', 400)
    }
})