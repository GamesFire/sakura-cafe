import { ApiPaths } from "@/constants/ApiPaths";
import { apiSlice } from "@/store/slices/apiSlice";
import { IFeedback } from "@/store/models/IFeedback";
import { CreateFeedbackRequest } from "@/store/models/request/CreateFeedbackRequest";
import { ProcessedFeedbackRequest } from "@/store/models/request/ProcessedFeedbackRequest";

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation<IFeedback, CreateFeedbackRequest>({
      query: (newFeedback) => ({
        url: `${ApiPaths.FEEDBACK_PATH}`,
        method: "POST",
        body: newFeedback,
      }),
      invalidatesTags: (result) => [
        result
          ? { type: "Feedback", id: result.id }
          : { type: "Feedback", id: "ERROR" },
      ],
    }),
    processedFeedback: builder.mutation<IFeedback, ProcessedFeedbackRequest>({
      query: (processedFeedback) => ({
        url: `${ApiPaths.FEEDBACK_PATH}/processed`,
        method: "PATCH",
        body: processedFeedback,
      }),
      invalidatesTags: (result, _error, { feedbackId }) => [
        result
          ? { type: "Feedback", id: feedbackId }
          : { type: "Feedback", id: "ERROR" },
      ],
    }),
    getFeedbacks: builder.query<IFeedback[], void>({
      query: () => ({
        url: `${ApiPaths.FEEDBACK_PATH}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Feedback" as const, id })),
              { type: "Feedback", id: "LIST" },
            ]
          : [{ type: "Feedback", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateFeedbackMutation,
  useProcessedFeedbackMutation,
  useGetFeedbacksQuery,
} = feedbackApi;
