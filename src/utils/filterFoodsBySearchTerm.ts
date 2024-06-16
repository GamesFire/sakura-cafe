import { IFood } from "@/store/models/IFood";

export const filterFoodsBySearchTerm = (
  foods: IFood[] | undefined,
  searchTerm: string
): IFood[] | undefined => {
  if (!searchTerm) return foods;

  return foods?.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
