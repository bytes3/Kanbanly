import { ApiErrorResponse, ApiResponse } from "apisauce";

export enum AppErrorCode {
  NetworkUnreachable = "NETWORK_UNREACHABLE",
  RequestTimeout = "REQUEST_TIMEOUT",
  ServerFailure = "SERVER_FAILURE",
  UnknownFailure = "UNKNOWN_FAILURE",
  EmptyResponseData = "EMPTY_RESPONSE_DATA"
}

export type AppErrorDetails = {
  code: AppErrorCode;
  message: string;
  retryable: boolean;
  status?: number;
  cause?: any;
};

const getAppErrorType = (response: ApiResponse<any> | null) => {
  const problem = response?.problem;

  if (problem === "TIMEOUT_ERROR") {
    return AppErrorCode.RequestTimeout;
  }

  if (problem === "NETWORK_ERROR") {
    return AppErrorCode.NetworkUnreachable;
  }

  if (problem === "SERVER_ERROR") {
    return AppErrorCode.ServerFailure;
  }

  if (problem === "UNKNOWN_ERROR" || (!response?.ok && !response?.data)) {
    return AppErrorCode.UnknownFailure;
  }

  if (response.ok && !response.data && response.status !== 204) {
    return AppErrorCode.EmptyResponseData;
  }

  return null;
};

export const createNetworkAppError = (
  response: ApiResponse<any>
): AppError | null => {
  const appErrorCode = getAppErrorType(response);

  if (!appErrorCode) {
    return null;
  }

  const appErrorDetails: Record<AppErrorCode, Omit<AppErrorDetails, "code">> = {
    [AppErrorCode.RequestTimeout]: {
      retryable: true,
      message: "The request took too long. Check your connection and try again."
    },
    [AppErrorCode.NetworkUnreachable]: {
      retryable: true,
      message: "No network connection. Please reconnect and retry."
    },
    [AppErrorCode.ServerFailure]: {
      retryable: true,
      message: "We hit a server error. Please try again in a moment."
    },
    [AppErrorCode.UnknownFailure]: {
      retryable: false,
      message: "Something went wrong. Please try again later."
    },
    [AppErrorCode.EmptyResponseData]: {
      retryable: false,
      message: "The server returned an empty response. Please try again later."
    }
  };

  return new AppError({
    code: appErrorCode,
    ...appErrorDetails[appErrorCode],
    cause: response?.data,
    status: response.status
  });
};

export class AppError extends Error {
  public appErrorDetails: AppErrorDetails;

  constructor(appErrorDetails: AppErrorDetails) {
    super(appErrorDetails.message, {
      cause: appErrorDetails.cause
    });

    this.appErrorDetails = appErrorDetails;
  }
}
