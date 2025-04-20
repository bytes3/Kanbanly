import {createClient} from "@openauthjs/openauth/client"

const client = createClient({
  clientID: "my-client",
  issuer: "http://localhost:3000", // url to the OpenAuth server
})

client.authorize("http://localhost:2412/lol", "code", {pkce: true}).then((authorized) => {
  console.log(authorized)
})
