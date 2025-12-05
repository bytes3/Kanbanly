import { describe, beforeEach, expect, it } from "bun:test";
import { createTestContext, MockedUserRepository } from "../test/utils";
import { User } from "@/backend/core/entity/user";
import { UserService } from "@/backend/core/services/user-service";
import { UserCreationMessage } from "@/backend/core/entity/server-message";
import { UserAlreadyExist } from "@/backend/core/errors/errors";
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
      userRepository.findUserByAccountId.mockResolvedValue(null);

      const result = await userService.create(user);

      expect(result).toEqual({
        message: UserCreationMessage.ok,
        user
      });
    });

    it("should throw if the user already is created", async () => {
      const expectedError = new UserAlreadyExist();

      expect(async () => {
        await userService.create(user);
      }).toThrow(expectedError);
    });
  });

  describe("User search", () => {
    const accountId = "some-accountId";

    it("should get user by account id", async () => {
      const result = await userService.getUser(accountId);

      expect(result).toEqual({ ...user, accountId });
    });

    it("should return null as a user", async () => {
      userRepository.findUserByAccountId.mockResolvedValue(null);

      const result = await userService.getUser(accountId);

      expect(result).toEqual(null);
    });
  });
});
