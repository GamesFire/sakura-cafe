import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { store } from "@/main";
import { ApiPaths } from "@/constants/ApiPaths";
import { removeCredentials, setCredentials } from "./authenticationSlice";
import { AuthenticationResponse } from "@/store/models/response/AuthenticationResponse";
import { CookieManager } from "@/utils/CookieManager";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = CookieManager.getAccessToken();

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    const state: RootState = store.getState();
    const { userInfo } = state.authenticationSlice;

    if (userInfo) {
      const refreshResult = await baseQuery(
        `${ApiPaths.AUTHENTICATION_PATH}/refresh`,
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const data = refreshResult.data as AuthenticationResponse;

        CookieManager.setAccessToken(data.accessToken);
        api.dispatch(
          setCredentials(CookieManager.getUserInfoFromAccessToken())
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        await baseQuery(
          `${ApiPaths.AUTHENTICATION_PATH}/logout`,
          api,
          extraOptions
        );
        api.dispatch(removeCredentials());
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Authentication",
    "Food",
    "Category",
    "Rating",
    "Tray",
    "Order",
    "User",
    "Ingredient",
    "Feedback",
  ],
  endpoints: () => ({}),
});
