import { useCallback } from "react";
import { isApiErrorResponse } from "@/utils/isApiErrorResponse";

export const useHandleApiError = () => {
  return useCallback((error: unknown): string => {
    if (isApiErrorResponse(error)) {
      return error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      isApiErrorResponse((error as any).data)
    ) {
      return (error as any).data.message;
    } else {
      return "Сталася помилка під час оформлення замовлення.";
    }
  }, []);
};
