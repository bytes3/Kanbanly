import type { User } from "core/entity";
import type { UserRepository } from "core/repositories";
import type { UserService } from "core/services";
import { UserAlreadyExist, UsernameAlreadyExists } from "../errors/errors";
import { handleServerError } from "../utils/handleServerErrors";
import { UserCreationMessage, UserGetMessage } from "../utils/server-message";

export class IUserService implements UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(accountId: string): Promise<User | null> {
    try {
      return await this.userRepository.findUserByAccountId(accountId);
    } catch (error: any) {
      handleServerError(UserGetMessage.serverError, error);
    }
  }

  async create(
    accountId: string,
    user: Omit<User, "id">
  ): Promise<{ message: string; user: User }> {
    try {
      const existingUser =
        await this.userRepository.findUserByAccountId(accountId);

      if (existingUser) {
        throw new UserAlreadyExist();
      }

      const existingUsername = await this.userRepository.findUserByUsername(
        user.username
      );

      if (existingUsername) {
        throw new UsernameAlreadyExists();
      }

      const newUser = await this.userRepository.create(accountId, user);

      return {
        message: UserCreationMessage.ok,
        user: newUser
      };
    } catch (error: any) {
      if (
        error instanceof UserAlreadyExist ||
        error instanceof UsernameAlreadyExists
      ) {
        throw error;
      }

      handleServerError(UserCreationMessage.serverError, error);
    }
  }
}
