import { ServerError } from "@/backend/core/errors/errors";
import { handleServiceError } from "./handleServiceErrors";

describe("handleServiceError()", () => {
  it("should throw server error with specific message", () => {
    const cause = new Error("Action failed");
    const message = "The specific action failed";
    const expectedError = new ServerError(
      "The specific action failed. There was an issue with the server",
      cause
    );

    expect(() => {
      handleServiceError(message, cause);
    }).toThrow(expectedError);
  });
});
