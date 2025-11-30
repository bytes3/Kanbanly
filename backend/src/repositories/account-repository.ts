import { Account } from "@/backend/core/entity/account";
import { AccountRepository } from "@/backend/core/repositories/account-repository";
import sql from "../db/instance";

interface AccountResult {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export class IAccountRepository implements AccountRepository {
  async findAccountByEmail(email: string): Promise<Account | null> {
    const result: [AccountResult] = await sql`
      SELECT * FROM account
      WHERE email = ${email};
    `;

    if (result.length <= 0) {
      return null;
    }

    return {
      id: result[0].id,
      email: result[0].email,
      createdAt: result[0].created_at
    };
  }

  async create(email: string, password: string): Promise<Account> {
    const account = {
      email,
      password_hash: password
    };

    const [result]: [AccountResult] = await sql`
      INSERT INTO account ${sql(account, "email", "password_hash")}
      returning *;
    `;

    return {
      id: result.id,
      email: result.email,
      createdAt: result.created_at
    };
  }
}
