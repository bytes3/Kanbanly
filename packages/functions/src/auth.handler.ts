import {handle} from "hono/aws-lambda";
import {issuer} from "@openauthjs/openauth";
import {subjects} from "./subjects";
import {GithubProvider} from "@openauthjs/openauth/provider/github";

const app = issuer({
  subjects,
  providers: {
    github: GithubProvider({
      clientID: "Ov23lir35gvAzMMD4Xyi",
      clientSecret: "0883243ce38e46711c71aeb7f3f14ec34b1f089e",

      scopes: ["email", "profile"]
    })
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

export const handler = handle(app);