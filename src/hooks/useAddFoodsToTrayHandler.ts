import { RootState } from "@/store/store";
import { useAppSelector } from "@/hooks/redux";
import { useAddFoodsToTrayMutation } from "@/services/tray";
import { IFood } from "@/store/models/IFood";

export const useHandleAddFoodsToTray = () => {
  const { tray } = useAppSelector((state: RootState) => state.traySlice);
  const [addFoodsToTray] = useAddFoodsToTrayMutation();

  const handleAddFoodsToTray = async () => {
    if (!tray) return;

    const foodIds = tray.foods.map((food: IFood) => food.id);

    if (foodIds.length === 0) return;

    try {
      await addFoodsToTray({ foodIds }).unwrap();
    } catch (error) {
      console.error("Не вдалося зберегти вміст таці:", error);
    }
  };

  return handleAddFoodsToTray;
};
