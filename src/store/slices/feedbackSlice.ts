import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedback } from "../models/IFeedback";

interface FeedbackState {
  feedbacks: IFeedback[];
}

const initialState: FeedbackState = {
  feedbacks: [],
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<IFeedback>) => {
      state.feedbacks.push(action.payload);
    },
    updateCurrentFeedback: (state, action: PayloadAction<IFeedback>) => {
      const index = state.feedbacks.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.feedbacks[index] = action.payload;
      }
    },
    removeFeedback: (state, action: PayloadAction<number>) => {
      state.feedbacks = state.feedbacks.filter(
        (feedback) => feedback.id !== action.payload
      );
    },
    setFeedbacks: (state, action: PayloadAction<IFeedback[]>) => {
      state.feedbacks = action.payload;
    },
  },
});

export const {
  addFeedback,
  updateCurrentFeedback,
  removeFeedback,
  setFeedbacks,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
