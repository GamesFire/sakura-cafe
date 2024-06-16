import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITray } from "../models/ITray";
import { IFood } from "../models/IFood";

interface TrayState {
  tray: ITray | null;
}

const initialState: TrayState = {
  tray: null,
};

export const traySlice = createSlice({
  name: "tray",
  initialState,
  reducers: {
    setTray: (state, action: PayloadAction<ITray>) => {
      state.tray = action.payload;
    },
    addFoodToTray: (state, action: PayloadAction<IFood>) => {
      state.tray?.foods.push(action.payload);
    },
    removeFoodFromTray: (state, action: PayloadAction<number>) => {
      if (state.tray) {
        state.tray.foods = state.tray.foods.filter(
          (food) => food.id !== action.payload
        );
      }
    },
    clearTray: (state) => {
      state.tray = null;
    },
  },
});

export const { setTray, addFoodToTray, removeFoodFromTray, clearTray } =
  traySlice.actions;

export default traySlice.reducer;
