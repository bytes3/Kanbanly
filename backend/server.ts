import {Hono} from 'hono'
import registerRoute from "./src/routes/register-route";

const app = new Hono()

app.route('/register', registerRoute)

export default app