import { describe, beforeEach, expect, it } from "bun:test";
import {
  createTestContext,
  type MockedProjectRepository,
  type MockedUserRepository
} from "../test/utils";
import type { User } from "core/entity";
import type { UserService } from "core/services";
import {
  UserCreationMessage,
  UserOnboardingStatusMessage
} from "../utils/server-message";
import {
  ProjectNotFound,
  UserAlreadyExist,
  UserError,
  UsernameAlreadyExists,
  UserNotFound
} from "../errors/errors";
import { IUserService } from "./user-service";
import type { ProjectRepository } from "core/repositories";

describe(() => {
  let user: User;
  let userRepository: MockedUserRepository;
  let projectRepository: MockedProjectRepository;
  let userService: UserService;

  beforeEach(() => {
    const testContext = createTestContext();

    user = testContext.user;
    userRepository = testContext.userRepository;
    projectRepository = testContext.projectRepository;

    userService = new IUserService(userRepository, projectRepository);
  });

  describe("User creation", () => {
    it("should add the user info successfully", async () => {
      const expectedAccountId = "account-id";
      userRepository.findUserByAccountId.mockResolvedValue(null);
      userRepository.findUserByUsername.mockResolvedValue(null);

      const result = await userService.create(expectedAccountId, user);

      expect(result).toEqual({
        message: UserCreationMessage.ok,
        user
      });
      expect(userRepository.create).toHaveBeenCalledWith(
        expectedAccountId,
        user
      );
    });

    it("should throw if the username exists", async () => {
      const expectedError = new UsernameAlreadyExists();
      userRepository.findUserByAccountId.mockResolvedValue(null);
      userRepository.findUserByAccountId.mockResolvedValue(null);

      expect(async () => {
        await userService.create("account-id", user);
      }).toThrow(expectedError);
      expect(userRepository.findUserByUsername).toHaveBeenCalledWith(
        user.username
      );
    });

    it("should throw if the user already is created", async () => {
      const accountId = "account-id";
      const expectedError = new UserAlreadyExist();

      expect(async () => {
        await userService.create(accountId, user);
      }).toThrow(expectedError);
    });
  });

  describe("User search", () => {
    const accountId = "some-accountId";

    it("should get user by account id", async () => {
      const result = await userService.getUser(accountId);

      expect(result).toEqual({ ...user });
      expect(userRepository.findUserByAccountId).toHaveBeenCalledWith(
        accountId
      );
    });

    it("should return null as a user", async () => {
      userRepository.findUserByAccountId.mockResolvedValue(null);

      const result = await userService.getUser(accountId);

      expect(result).toEqual(null);
      expect(userRepository.findUserByAccountId).toHaveBeenCalledWith(
        accountId
      );
    });
  });

  describe("Update onboarding", () => {
    it("should update onboarding status and return a true", async () => {
      const result = await userService.updateOnboardingStatus();

      expect(result).toBe(true);
      expect(userRepository.getCurrentUser).toBeCalled();
      expect(projectRepository.getMainProject).toBeCalled();
      expect(userRepository.updateCompletedOnboarding).toBeCalled();
    });

    it("should throw user error if the user did not complete onboarding", async () => {
      const expectedError = new UserNotFound();
      userRepository.getCurrentUser.mockResolvedValue(null);

      expect(async () => {
        await userService.updateOnboardingStatus();
      }).toThrow(expectedError);
      expect(userRepository.getCurrentUser).toBeCalled();
      expect(userRepository.updateCompletedOnboarding).not.toBeCalled();
    });

    it("should throw user error if the user has no project", async () => {
      const expectedError = new ProjectNotFound();
      projectRepository.getMainProject.mockResolvedValue(null);

      expect(async () => {
        await userService.updateOnboardingStatus();
      }).toThrow(expectedError);
      expect(userRepository.getCurrentUser).toBeCalled();
      expect(projectRepository.getMainProject).toBeCalled();
      expect(userRepository.updateCompletedOnboarding).not.toBeCalled();
    });
  });
});
