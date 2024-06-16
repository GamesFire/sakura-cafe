import { ApiPaths } from "@/constants/ApiPaths";
import { apiSlice } from "@/store/slices/apiSlice";
import { IOrder } from "@/store/models/IOrder";
import { AcceptAndRejectOrderRequest } from "@/store/models/request/AcceptAndRejectOrderRequest";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<IOrder, void>({
      query: () => ({
        url: `${ApiPaths.ORDER_PATH}`,
        method: "POST",
      }),
      invalidatesTags: (result) => [
        result
          ? { type: "Order", id: result.id }
          : { type: "Order", id: "ERROR" },
      ],
    }),
    getOwnOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: `${ApiPaths.ORDER_PATH}/own`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    getOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: `${ApiPaths.ORDER_PATH}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    cancelOrder: builder.mutation<IOrder, number>({
      query: (orderId) => ({
        url: `${ApiPaths.ORDER_PATH}/cancel`,
        method: "PATCH",
        params: {
          orderId,
        },
      }),
      invalidatesTags: (result, _error, orderId) => [
        result
          ? { type: "Order", id: orderId }
          : { type: "Order", id: "ERROR" },
      ],
    }),
    acceptOrder: builder.mutation<IOrder, AcceptAndRejectOrderRequest>({
      query: (acceptedOrder) => ({
        url: `${ApiPaths.ORDER_PATH}/accept`,
        method: "PATCH",
        body: acceptedOrder,
      }),
      invalidatesTags: (result, _error, { orderId }) => [
        result
          ? { type: "Order", id: orderId }
          : { type: "Order", id: "ERROR" },
      ],
    }),
    rejectOrder: builder.mutation<IOrder, AcceptAndRejectOrderRequest>({
      query: (rejectedOrder) => ({
        url: `${ApiPaths.ORDER_PATH}/reject`,
        method: "PATCH",
        body: rejectedOrder,
      }),
      invalidatesTags: (result, _error, { orderId }) => [
        result
          ? { type: "Order", id: orderId }
          : { type: "Order", id: "ERROR" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetOwnOrdersQuery,
  useLazyGetOwnOrdersQuery,
  useCancelOrderMutation,
  useGetOrdersQuery,
  useAcceptOrderMutation,
  useRejectOrderMutation,
} = orderApi;
