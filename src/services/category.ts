import { ICategory } from "@/store/models/ICategory";
import { apiSlice } from "@/store/slices/apiSlice";
import { ApiPaths } from "@/constants/ApiPaths";
import { CreateCategoryRequest } from "@/store/models/request/CreateCategoryRequest";
import { UpdateCategoryRequest } from "@/store/models/request/UpdateCategoryRequest";
import { DeleteResponse } from "@/store/models/response/DeleteResponse";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: `${ApiPaths.CATEGORY_PATH}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    getCategoryById: builder.query<ICategory, number>({
      query: (id) => ({
        url: `${ApiPaths.CATEGORY_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: (result, _error, id) => [
        result
          ? { type: "Category", id: id }
          : { type: "Category", id: "ERROR" },
      ],
    }),
    createCategory: builder.mutation<ICategory, CreateCategoryRequest>({
      query: (newCategory) => ({
        url: `${ApiPaths.CATEGORY_PATH}`,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: (result, _error, { name }) => [
        result
          ? { type: "Category", id: name }
          : { type: "Category", id: "ERROR" },
      ],
    }),
    updateCategory: builder.mutation<ICategory, UpdateCategoryRequest>({
      query: (updatedCategory) => ({
        url: `${ApiPaths.CATEGORY_PATH}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: (result, _error, { id }) => [
        result
          ? { type: "Category", id: id }
          : { type: "Category", id: "ERROR" },
      ],
    }),
    deleteCategory: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `${ApiPaths.CATEGORY_PATH}`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: (result, _error, id) => [
        result
          ? { type: "Category", id: id }
          : { type: "Category", id: "ERROR" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
