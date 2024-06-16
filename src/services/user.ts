import { IUser } from "@/store/models/IUser";
import { ApiPaths } from "@/constants/ApiPaths";
import { apiSlice } from "@/store/slices/apiSlice";
import { AddAdminRoleForUserRequest } from "@/store/models/request/AddAdminRoleForUserRequest";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `${ApiPaths.USER_PATH}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    addAdminRoleForUser: builder.mutation<IUser, AddAdminRoleForUserRequest>({
      query: (user) => ({
        url: `${ApiPaths.USER_PATH}/add-admin`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result, _error, user) => [
        result
          ? { type: "User", id: user.userId }
          : { type: "User", id: "ERROR" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useAddAdminRoleForUserMutation } = userApi;
