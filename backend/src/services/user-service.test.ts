import { describe, beforeEach, expect, it } from "bun:test";
import { createTestContext, MockedUserRepository } from "../test/utils";
import { User } from "@/backend/core/entity/user";
import { UserService } from "@/backend/core/services/user-service";
import { UserCreationMessage } from "@/backend/core/entity/server-message";
import {
  UserAlreadyExist,
  UsernameAlreadyExists
} from "@/backend/core/errors/errors";
import { IUserService } from "./user-service";

describe(() => {
  let user: User;
  let userRepository: MockedUserRepository;
  let userService: UserService;

  beforeEach(() => {
    const testContext = createTestContext();

    user = testContext.user;
    userRepository = testContext.userRepository;

    userService = new IUserService(userRepository);
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
});
