import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../models/IOrder";

interface OrderState {
  orders: IOrder[];
}

const initialState: OrderState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload);
    },
    updateCurrentOrder: (state, action: PayloadAction<IOrder>) => {
      const { id, status, date, tray } = action.payload;
      const index = state.orders.findIndex((order) => order.id === id);
      if (index !== -1) {
        state.orders[index] = { id, status, date, tray };
      }
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders.length = 0;
    },
  },
});

export const {
  addOrder,
  updateCurrentOrder,
  removeOrder,
  setOrders,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
