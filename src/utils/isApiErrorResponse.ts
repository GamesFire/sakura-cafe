import { ApiErrorResponse } from "@/store/models/response/ApiErrorResponse";

export const isApiErrorResponse = (error: any): error is ApiErrorResponse => {
  return (
    error &&
    typeof error.message === "string" &&
    typeof error.error === "string" &&
    typeof error.statusCode === "number"
  );
};