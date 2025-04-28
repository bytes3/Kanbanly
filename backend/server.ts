import {Hono} from 'hono'
import {serve} from "@hono/node-server";
import registerRoute from "./src/routes/register-route.ts";

const app = new Hono()

app.route('/register', registerRoute)

export default app