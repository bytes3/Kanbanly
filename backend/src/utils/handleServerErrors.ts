import { ServerError } from "@/backend/core/errors/errors";

export function handleServerError(message: string, cause: Error): never {
  const newMessage = `${message}. There was an issue with the server`;

  throw new ServerError(newMessage, cause);
}
