import { IIngredient } from "../models/IIngredient";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IngredientState {
  ingredients: IIngredient[];
}

const initialState: IngredientState = {
  ingredients: [],
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.ingredients.push(action.payload);
    },
    updateCurrentIngredient: (state, action: PayloadAction<IIngredient>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      if (index !== -1) {
        state.ingredients[index] = action.payload;
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    setIngredients: (state, action: PayloadAction<IIngredient[]>) => {
      state.ingredients = action.payload;
    },
  },
});

export const {
  addIngredient,
  updateCurrentIngredient,
  removeIngredient,
  setIngredients,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
