import { apiSlice } from "@/store/slices/apiSlice";
import { IIngredient } from "@/store/models/IIngredient";
import { ApiPaths } from "@/constants/ApiPaths";
import { CreateIngredientRequest } from "@/store/models/request/CreateIngredientRequest";
import { UpdateIngredientRequest } from "@/store/models/request/UpdateIngredientRequest";
import { DeleteResponse } from "@/store/models/response/DeleteResponse";
import { createFormData } from "@/utils/createFormData";

export const ingredientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<IIngredient[], void>({
      query: () => ({
        url: `${ApiPaths.INGREDIENT_PATH}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Ingredient" as const, id })),
              { type: "Ingredient", id: "LIST" },
            ]
          : [{ type: "Ingredient", id: "LIST" }],
    }),
    createIngredient: builder.mutation<IIngredient, CreateIngredientRequest>({
      query: (newIngredient) => ({
        url: `${ApiPaths.INGREDIENT_PATH}`,
        method: "POST",
        body: createFormData(newIngredient),
      }),
      invalidatesTags: (result, _error, { title }) => [
        result
          ? { type: "Ingredient", id: title }
          : { type: "Ingredient", id: "ERROR" },
      ],
    }),
    updateIngredient: builder.mutation<IIngredient, UpdateIngredientRequest>({
      query: (updatedIngredient) => ({
        url: `${ApiPaths.INGREDIENT_PATH}`,
        method: "PUT",
        body: createFormData(updatedIngredient),
      }),
      invalidatesTags: (result, _error, { id }) => [
        result
          ? { type: "Ingredient", id: id }
          : { type: "Ingredient", id: "ERROR" },
      ],
    }),
    deleteIngredient: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `${ApiPaths.INGREDIENT_PATH}`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: (result, _error, id) => [
        result
          ? { type: "Ingredient", id: id }
          : { type: "Ingredient", id: "ERROR" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIngredientsQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientApi;
