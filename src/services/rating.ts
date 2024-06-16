import { ApiPaths } from "@/constants/ApiPaths";
import { apiSlice } from "@/store/slices/apiSlice";
import { RatingRequest } from "@/store/models/request/RatingRequest";
import { RatingResponse } from "@/store/models/response/RatingResponse";
import { DeleteResponse } from "@/store/models/response/DeleteResponse";

export const ratingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRating: builder.mutation<RatingResponse, RatingRequest>({
      query: (newRating) => ({
        url: `${ApiPaths.RATING_PATH}`,
        method: "POST",
        body: newRating,
      }),
      invalidatesTags: (result) => [{ type: "Rating", id: result?.id }],
    }),
    deleteRating: builder.mutation<DeleteResponse, number>({
      query: (foodId) => ({
        url: `${ApiPaths.RATING_PATH}`,
        method: "DELETE",
        params: {
          foodId,
        },
      }),
      invalidatesTags: [{ type: "Rating", id: "DELETED" }],
    }),
    getAllRatings: builder.query<RatingResponse[], void>({
      query: () => ({
        url: `${ApiPaths.RATING_PATH}`,
        method: "GET",
      }),
      providesTags: [{ type: "Rating", id: "LIST" }],
    }),
    getOneRating: builder.query<RatingResponse, number>({
      query: (foodId) => ({
        url: `${ApiPaths.RATING_PATH}/${foodId}`,
        method: "GET",
      }),
      providesTags: ["Rating"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useGetAllRatingsQuery,
  useLazyGetAllRatingsQuery,
  useGetOneRatingQuery,
} = ratingApi;
