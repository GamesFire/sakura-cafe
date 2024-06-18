import type { ApiErrorResponse } from "@/types/ApiErrorResponse";

export const isApiErrorResponse = (error: any): error is ApiErrorResponse => {
  if (!error) {
    return false;
  }

  if (Array.isArray(error.data)) {
    return error.data.every(
      (errorMessage: any) => typeof errorMessage === "string"
    );
  }

  if (typeof error.data === "object" && error.data !== null) {
    return (
      typeof error.data.message === "string" &&
      typeof error.data.error === "string" &&
      typeof error.data.statusCode === "number"
    );
  }

  return false;
};
