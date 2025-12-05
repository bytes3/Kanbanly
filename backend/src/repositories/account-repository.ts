import {
  AccountQueryResult,
  AccountRepository
} from "@/backend/core/repositories/account-repository";
import sql from "../db/instance";

export class IAccountRepository implements AccountRepository {
  async findAccountByEmail(email: string): Promise<AccountQueryResult | null> {
    const result: [AccountQueryResult] = await sql`
      SELECT * FROM account
      WHERE email = ${email};
    `;

    if (result.length <= 0) {
      return null;
    }

    return {
      id: result[0].id,
      email: result[0].email,
      created_at: result[0].created_at,
      password_hash: result[0].password_hash
    };
  }

  async create(email: string, password: string): Promise<AccountQueryResult> {
    const account = {
      email,
      password_hash: password
    };

    const [result]: [AccountQueryResult] = await sql`
      INSERT INTO account ${sql(account, "email", "password_hash")}
      returning *;
    `;

    return {
      id: result.id,
      email: result.email,
      created_at: result.created_at,
      password_hash: result.password_hash
    };
  }
}
