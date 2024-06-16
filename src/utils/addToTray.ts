import { IFood } from "@/store/models/IFood";
import type { RootState } from "@/store/store";
import { store } from "@/main";
import { addFoodToTray } from "@/store/slices/traySlice";

export const addToTray = (food: IFood): void => {
  const state: RootState = store.getState();
  const { tray } = state.traySlice;
  const dispatch = store.dispatch;

  if (!tray) return;

  const foodInTray = tray.foods.find((item) => item.id === food.id);

  if (!foodInTray) {
    dispatch(addFoodToTray(food));
  }
};
