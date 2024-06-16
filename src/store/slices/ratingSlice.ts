import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RatingResponse } from "../models/response/RatingResponse";

interface RatingState {
  [foodId: number]: number;
}

const initialState: RatingState = {};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    addRating(state, action: PayloadAction<{ foodId: number; rate: number }>) {
      const { foodId, rate } = action.payload;
      state[foodId] = rate;
    },
    removeRating(state, action: PayloadAction<number>) {
      const foodIdToDelete = action.payload;
      delete state[foodIdToDelete];
    },
    setRating(state, action: PayloadAction<RatingResponse[]>) {
      action.payload.forEach((rating) => {
        if (rating && rating.food && rating.food.id !== undefined) {
          state[rating.food.id] = rating.rate;
        }
      });
    },
    clearRating(state) {
      Object.keys(state).forEach((key) => {
        delete state[parseInt(key)];
      });
    },
  },
});

export const { addRating, removeRating, setRating, clearRating } =
  ratingSlice.actions;

export default ratingSlice.reducer;
