import {
  UserCreationMessage,
  UserGetMessage
} from "@/backend/src/utils/server-message";
import { User } from "@/backend/core/entity/user";
import {
  UserAlreadyExist,
  UsernameAlreadyExists
} from "@/backend/src/errors/errors";
import { UserRepository } from "@/backend/core/repositories/user-repository";
import { UserService } from "@/backend/core/services/user-service";
import { handleServerError } from "../utils/handleServerErrors";

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
