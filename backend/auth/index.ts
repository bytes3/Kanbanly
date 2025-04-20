import { serve } from "@hono/node-server"
import {issuer} from "@openauthjs/openauth";
import {subjects} from "./subjects.ts";
import {GithubProvider} from "@openauthjs/openauth/provider/github";
import {MemoryStorage} from "@openauthjs/openauth/storage/memory"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"

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
      scopes: ["email", "profile"]
    }),
    code: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
      }),
    ),
  },

  async success(ctx, value) {
    if (value.provider === "github") {
      console.log(value.tokenset.access)
    }

    return ctx.subject("user", {
      userID: "",
      email: ""
    })
  }
})

serve(app)
