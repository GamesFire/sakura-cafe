import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authenticationSlice from "./slices/authenticationSlice";
import foodSlice from "./slices/foodSlice";
import categorySlice from "./slices/categorySlice";
import ratingSlice from "./slices/ratingSlice";
import traySlice from "./slices/traySlice";
import orderSlice from "./slices/orderSlice";
import ingredientSlice from "./slices/ingredientSlice";
import feedbackSlice from "./slices/feedbackSlice";

const rootReducer = combineReducers({
  authenticationSlice,
  foodSlice,
  categorySlice,
  ratingSlice,
  traySlice,
  orderSlice,
  ingredientSlice,
  feedbackSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
