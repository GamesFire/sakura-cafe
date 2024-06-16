import { ApiPaths } from "@/constants/ApiPaths";
import { LoginRequest } from "@/store/models/request/LoginRequest";
import { RegistrationRequest } from "@/store/models/request/RegistrationRequest";
import { AuthenticationResponse } from "@/store/models/response/AuthenticationResponse";
import { DeleteResponse } from "@/store/models/response/DeleteResponse";
import { apiSlice } from "@/store/slices/apiSlice";

export const authenticationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<AuthenticationResponse, RegistrationRequest>(
      {
        query: (credentials) => ({
          url: `${ApiPaths.AUTHENTICATION_PATH}/registration`,
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: [{ type: "Authentication", id: "REGISTRATION" }],
      }
    ),
    login: builder.mutation<AuthenticationResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${ApiPaths.AUTHENTICATION_PATH}/login`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Authentication", id: "LOGIN" }],
    }),
    logout: builder.mutation<DeleteResponse, void>({
      query: () => ({
        url: `${ApiPaths.AUTHENTICATION_PATH}/logout`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Authentication", id: "LOGOUT" }],
    }),
    checkAuthentication: builder.query<AuthenticationResponse, void>({
      query: () => ({
        url: `${ApiPaths.AUTHENTICATION_PATH}/refresh`,
        method: "GET",
      }),
      providesTags: (result) => {
        if (result) {
          return [{ type: "Authentication", id: "REFRESH" }];
        }
        return [];
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthenticationQuery,
} = authenticationApi;
