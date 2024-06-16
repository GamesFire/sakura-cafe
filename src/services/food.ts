import { IFood } from "@/store/models/IFood";
import { ApiPaths } from "@/constants/ApiPaths";
import { apiSlice } from "@/store/slices/apiSlice";
import { CreateFoodRequest } from "@/store/models/request/CreateFoodRequest";
import { UpdateFoodRequest } from "@/store/models/request/UpdateFoodRequest";
import { DeleteResponse } from "@/store/models/response/DeleteResponse";
import { createFormData } from "@/utils/createFormData";

export const foodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFoodsByCategoryName: builder.query<IFood[], string>({
      query: (categoryName) => ({
        url: `${ApiPaths.FOOD_PATH}/category`,
        params: { categoryName },
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Food" as const, id })),
              { type: "Food", id: "LIST" },
            ]
          : [{ type: "Food", id: "LIST" }],
    }),
    getMostPopularFood: builder.query<IFood, void>({
      query: () => ({
        url: `${ApiPaths.FOOD_PATH}/most-popular`,
        method: "GET",
      }),
      providesTags: [{ type: "Food", id: "MOST_POPULAR" }],
    }),
    getFoodById: builder.query<IFood, number>({
      query: (id) => ({
        url: `${ApiPaths.FOOD_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Food", id }],
    }),
    getFoods: builder.query<IFood[], void>({
      query: () => ({
        url: `${ApiPaths.FOOD_PATH}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Food" as const, id })),
              { type: "Food", id: "LIST" },
            ]
          : [{ type: "Food", id: "LIST" }],
    }),
    createFood: builder.mutation<IFood, CreateFoodRequest>({
      query: (newFood) => {
        return {
          url: `${ApiPaths.FOOD_PATH}`,
          method: "POST",
          body: createFormData(newFood),
        };
      },
      invalidatesTags: (result, _error, { name }) => [
        result ? { type: "Food", id: name } : { type: "Food", id: "ERROR" },
      ],
    }),
    updateFood: builder.mutation<IFood, UpdateFoodRequest>({
      query: (updatedFood) => {
        return {
          url: `${ApiPaths.FOOD_PATH}`,
          method: "PUT",
          body: createFormData(updatedFood),
        };
      },
      invalidatesTags: (result, _error, { id }) => [
        result ? { type: "Food", id: id } : { type: "Food", id: "ERROR" },
      ],
    }),
    deleteFood: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `${ApiPaths.FOOD_PATH}`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: (result, _error, id) => [
        result ? { type: "Food", id: id } : { type: "Food", id: "ERROR" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFoodsByCategoryNameQuery,
  useGetMostPopularFoodQuery,
  useGetFoodByIdQuery,
  useGetFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodApi;
