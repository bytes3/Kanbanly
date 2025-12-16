import type { AccountRepository } from "core/repositories";
import type { Account } from "core/entity";
import type { AccountQueryResult } from "../db/query-results";
import sql from "../db/instance";

export class IAccountRepository implements AccountRepository {
  async findAccountByEmail(email: string): Promise<Account | null> {
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
      createdAt: result[0].created_at,
      passwordHash: result[0].password_hash
    };
  }

  async create(email: string, password: string): Promise<Account> {
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
      createdAt: result.created_at,
      passwordHash: result.password_hash
    };
  }
}
