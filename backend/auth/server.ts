import { issuer } from "@openauthjs/openauth";
import { subjects } from "./subjects";
import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";
import { IAccountRepository } from "@/backend/src/repositories/account-repository";
import { IAccountService } from "@/backend/src/services/account-service";

const storage = MemoryStorage({
  persist: "./persist.json",
});

const app = issuer({
  storage,
  subjects,
  providers: {
    github: GithubProvider({
      clientID: "Ov23lir35gvAzMMD4Xyi",
      clientSecret: "0883243ce38e46711c71aeb7f3f14ec34b1f089e",
      scopes: ["user:email", "user:profile"],
    }),
  },

  async success(ctx, value) {
    if (value.provider === "github") {
      const result = await getGithubEmail(value.tokenset.access);

      if (result.ok) {
        const accountRepository = new IAccountRepository();
        const accountService = new IAccountService(accountRepository);

        const account = accountService.register(result.email);

        return ctx.subject("user", {
          userID: account.id,
          email: account.email,
        });
      }
    }

    // TODO: Password register
    return ctx.subject("user", {
      userID: "test",
      email: "test",
    });
  },
});

interface GitHubEmailResponse {
  ok: boolean;
  email: string;
  err?: any;
}

const getGithubEmail = async (
  accessToken: string,
): Promise<GitHubEmailResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const response = await fetch("https://api.github.com/user/emails", {
      method: "GET",
      headers,
    });
    const body = await response.json();

    if (!Array.isArray(body)) {
      return { email: "", err: new Error("email dose not exist"), ok: false };
    }

    return { email: body[0].email, ok: true };
  } catch (err) {
    return { email: "", err, ok: false };
  }
};

export default app;
