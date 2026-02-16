import { describe, it, expect } from "bun:test";
import { ServerError } from "../errors/errors";
import { handleServerError } from "./handleServerErrors";

describe("handleServerError()", () => {
  it("should throw server error with specific message", () => {
    const cause = new Error("Action failed");
    const message = "The specific action failed";
    const expectedError = new ServerError(
      "The specific action failed. There was an issue with the server",
      cause
    );

    expect(() => {
      handleServerError(message, cause);
    }).toThrow(expectedError);
  });
});
