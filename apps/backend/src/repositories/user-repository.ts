import type { SessionInfo, User } from "core/entity";
import type { UserRepository } from "core/repositories";
import type { UserQueryResult } from "../db/query-results";
import sql from "../db/instance";
import { UserError } from "../errors/errors";

export class IUserRepository implements UserRepository {
  private sessionInfo: SessionInfo;

  constructor(sessionInfo: SessionInfo) {
    this.sessionInfo = sessionInfo;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const [queryResult]: [UserQueryResult] = await sql`
      SELECT * FROM account_user
      WHERE username = ${username};
    `;

    if (!queryResult) {
      return null;
    }

    return parseUser(queryResult);
  }

  async findUserByAccountId(accountId: string): Promise<User | null> {
    const [queryResult]: [UserQueryResult] = await sql`
      SELECT * FROM account_user
      WHERE account_id = ${accountId};
    `;

    if (!queryResult) {
      return null;
    }

    return parseUser(queryResult);
  }

  async create(accountId: string, user: Omit<User, "id">): Promise<User> {
    const userAccount = getInsertUserQuery(accountId, user);
    userAccount.account_id = accountId;

    const [queryResult]: [UserQueryResult] = await sql`
      INSERT INTO account_user
        ${sql(userAccount)}
        returning *;
    `;

    return parseUser(queryResult);
  }

  async updateCompletedOnboarding(): Promise<boolean> {
    await sql`
      UPDATE account_user
        SET completed_onboarding=True
        WHERE account_id = ${this.sessionInfo.accountId};
    `;

    return true;
  }

  async getCurrentUser(): Promise<User | null> {
    const [queryResult]: [UserQueryResult] = await sql`
      SELECT * FROM account_user
        WHERE account_id = ${this.sessionInfo.accountId};
    `;

    if (!queryResult) {
      return null;
    }

    return parseUser(queryResult);
  }
}

function parseUser(queryResult: UserQueryResult): User {
  return {
    id: queryResult.id,
    username: queryResult.username,
    firstName: queryResult.first_name,
    lastName: queryResult.last_name,
    dateBirth: queryResult.date_birth,
    gender: queryResult.gender,
    city: queryResult.city,
    country: queryResult.country,
    state: queryResult.state,
    completedOnboarding: queryResult.completed_onboarding
  };
}

function getInsertUserQuery(accountId: string, user: Partial<User>) {
  return {
    account_id: accountId,
    username: user.username,
    first_name: user.firstName,
    last_name: user.lastName,
    date_birth: user.dateBirth,
    gender: user.gender,
    city: user.city,
    country: user.country,
    state: user.state,
    completed_onboarding: user.completedOnboarding
  };
}
