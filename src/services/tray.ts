import { apiSlice } from "@/store/slices/apiSlice";
import { ITray } from "@/store/models/ITray";
import { AddFoodsToTrayRequest } from "@/store/models/request/AddFoodsToTrayRequest";
import { ApiPaths } from "@/constants/ApiPaths";

export const trayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFoodsToTray: builder.mutation<ITray, AddFoodsToTrayRequest>({
      query: (body) => ({
        url: `${ApiPaths.TRAY_PATH}/foods`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tray", id: "ADDED_FOODS_TO_TRAY" }],
    }),
    getMostRecentTray: builder.query<ITray, void>({
      query: () => ({
        url: `${ApiPaths.TRAY_PATH}/own`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "Tray", id: result.id }] : [],
    }),
  }),
  overrideExisting: false,
});

export const { useAddFoodsToTrayMutation, useLazyGetMostRecentTrayQuery } =
  trayApi;
