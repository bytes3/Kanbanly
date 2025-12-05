import {
  UserCreationMessage,
  UserGetMessage
} from "@/backend/core/entity/server-message";
import { User } from "@/backend/core/entity/user";
import { UserAlreadyExist } from "@/backend/core/errors/errors";
import { UserRepository } from "@/backend/core/repositories/user-repository";
import { UserService } from "@/backend/core/services/user-service";
import { handleServiceError } from "../utils/handleServiceErrors";

export class IUserService implements UserService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(accountId: string): Promise<User | null> {
    try {
      return await this.userRepository.findUserByAccountId(accountId);
    } catch (error: any) {
      handleServiceError(UserGetMessage.serverError, error);
    }
  }

  async create(user: User): Promise<{ message: string; user: User }> {
    try {
      const existingUser = await this.userRepository.findUserByAccountId(
        user.accountId
      );

      if (existingUser) {
        throw new UserAlreadyExist();
      }

      const newUser = await this.userRepository.create(user);

      return {
        message: UserCreationMessage.ok,
        user: newUser
      };
    } catch (error: any) {
      if (error instanceof UserAlreadyExist) {
        throw error;
      }

      handleServiceError(UserCreationMessage.serverError, error);
    }
  }
}
