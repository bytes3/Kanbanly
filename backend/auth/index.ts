import {serve} from "@hono/node-server"
import {issuer} from "@openauthjs/openauth";
import {subjects} from "./subjects.ts";
import {GithubProvider} from "@openauthjs/openauth/provider/github";
import {MemoryStorage} from "@openauthjs/openauth/storage/memory"
import {CodeUI} from "@openauthjs/openauth/ui/code"
import {CodeProvider} from "@openauthjs/openauth/provider/code"

const storage = MemoryStorage({
  persist: "./persist.json"
})

const app = issuer({
  storage,
  subjects,
  providers: {
    github: GithubProvider({
      clientID: "Ov23lir35gvAzMMD4Xyi",
      clientSecret: "0883243ce38e46711c71aeb7f3f14ec34b1f089e",
      scopes: ["user:email", "user:profile"]
    }),
  },

  async success(ctx, value) {
    if (value.provider === "github") {
      const result = await getGithubEmail(value.tokenset.access)

      if (result.ok) {
        // TODO: Account server to implement: PUT /account/register

        return ctx.subject("user", {
          userID: "profile",
          email: result.body.email
        })
      }
    }

    return ctx.subject("user", {
      userID: "test",
      email: "test"
    })
  }
})

const getGithubEmail = async (accessToken: string) => {
  try {
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    }
    
    const response = await fetch("https://api.github.com/user/emails", {method: 'GET', headers})
    const body = await response.json()

    return {body, ok: true}
  } catch (err) {
    return {err, ok: false}
  }
};

serve({
  fetch: app.fetch,
  port: 3001
})
