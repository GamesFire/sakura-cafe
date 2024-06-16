import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "./../models/ICategory";

interface CategoryState {
  categories: ICategory[];
  activeCategory: ICategory | null;
}

const initialState: CategoryState = {
  categories: [],
  activeCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload);
    },
    updateCurrentCategory: (state, action: PayloadAction<ICategory>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<ICategory>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const {
  addCategory,
  updateCurrentCategory,
  removeCategory,
  setCategories,
  setActiveCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
