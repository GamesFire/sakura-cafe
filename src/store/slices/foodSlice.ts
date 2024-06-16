import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFood } from "../models/IFood";

interface FoodState {
  foods: IFood[];
}

const initialState: FoodState = {
  foods: [],
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addFood: (state, action: PayloadAction<IFood>) => {
      state.foods.push(action.payload);
    },
    updateCurrentFood: (state, action: PayloadAction<IFood>) => {
      const index = state.foods.findIndex(
        (food) => food.id === action.payload.id
      );
      if (index !== -1) {
        state.foods[index] = action.payload;
      }
    },
    removeFood: (state, action: PayloadAction<number>) => {
      state.foods = state.foods.filter((food) => food.id !== action.payload);
    },
    setFoods: (state, action: PayloadAction<IFood[]>) => {
      state.foods = action.payload;
    },
  },
});

export const { addFood, updateCurrentFood, removeFood, setFoods } =
  foodSlice.actions;

export default foodSlice.reducer;
