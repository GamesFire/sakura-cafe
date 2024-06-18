import { useCallback } from "react";
import { isApiErrorResponse } from "@/utils/isApiErrorResponse";

export const useHandleApiError = () => {
  return useCallback((error: unknown): string => {
    if (isApiErrorResponse(error)) {
      if ("data" in error && Array.isArray(error.data)) {
        const formattedErrors = error.data.map((errorMessage: string) => {
          const errorMessageParts = errorMessage.split(" - ");
          return errorMessageParts.length > 1
            ? errorMessageParts[1]
            : errorMessageParts[0];
        });
        return formattedErrors.join(", ");
      } else {
        return (error as any).data.message;
      }
    } else {
      console.error(error);
      return "Сталася нерозпізнана помилка.";
    }
  }, []);
};
