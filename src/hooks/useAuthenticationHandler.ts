import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setCredentials,
  removeCredentials,
} from "../store/slices/authenticationSlice";
import {
  useCheckAuthenticationQuery,
  useLogoutMutation,
} from "../services/authentication";
import { CookieManager } from "../utils/CookieManager";
import { isFetchBaseQueryError } from "../utils/isFetchBaseQueryError";

interface UseAuthenticationHandlerReturn {
  isLoading: boolean;
}

export const useAuthenticationHandler = (): UseAuthenticationHandlerReturn => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useCheckAuthenticationQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (data) {
          CookieManager.setAccessToken(data.accessToken);
          dispatch(setCredentials(CookieManager.getUserInfoFromAccessToken()));
        } else if (error) {
          if (!isFetchBaseQueryError(error) || error.status !== 401) {
            await logout();
            dispatch(removeCredentials());
          }
        }
      } catch (error) {
        console.error("Error handling authentication:", error);
      }
    };

    handleAuth();
  }, [data, error, logout, dispatch]);

  return { isLoading };
};
