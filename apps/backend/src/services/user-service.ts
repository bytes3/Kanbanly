import type { User } from "core/entity";
import type { ProjectRepository, UserRepository } from "core/repositories";
import type { UserService } from "core/services";
import {
  ProjectNotFound,
  UserAlreadyExist,
  UsernameAlreadyExists,
  UserNotFound
} from "../errors/errors";
import { handleServerError } from "../utils/handleServerErrors";
import {
  UserCreationMessage,
  UserGetMessage,
  UserOnboardingStatusMessage
} from "../utils/server-message";

export class IUserService implements UserService {
  private userRepository: UserRepository;
  private projectRepository: ProjectRepository;

  constructor(
    userRepository: UserRepository,
    projectRepository: ProjectRepository
  ) {
    this.userRepository = userRepository;
    this.projectRepository = projectRepository;
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

  async updateOnboardingStatus(): Promise<boolean> {
    try {
      const isUserExisting = await this.userRepository.getCurrentUser();
      const hasProjects = await this.projectRepository.getMainProject();

      if (!isUserExisting) {
        throw new UserNotFound();
      }

      if (!hasProjects) {
        throw new ProjectNotFound();
      }

      const onboardingStatus =
        await this.userRepository.updateCompletedOnboarding();

      return onboardingStatus;
    } catch (error: any) {
      if (error instanceof UserNotFound || error instanceof ProjectNotFound) {
        throw error;
      }

      handleServerError(UserOnboardingStatusMessage.serverError, error);
    }
  }
}
