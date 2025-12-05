import { ServerError } from "@/backend/core/errors/errors";

export function handleServiceError(message: string, cause: Error): never {
  const newMessage = `${message}. There was an issue with the server`;

  throw new ServerError(newMessage, cause);
}
