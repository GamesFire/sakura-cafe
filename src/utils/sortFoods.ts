import { IFood } from "@/store/models/IFood";

export const sortFoods = (
  foods: IFood[] | undefined,
  sortOption: string
): IFood[] | undefined => {
  if (!sortOption || sortOption === "not-sort") return foods;

  return [...(foods || [])].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return (a?.price || 0) - (b?.price || 0);
      case "price-desc":
        return (b?.price || 0) - (a?.price || 0);
      case "rating-asc":
        return (a?.rating || 0) - (b?.rating || 0);
      case "rating-desc":
        return (b?.rating || 0) - (a?.rating || 0);
      default:
        return 0;
    }
  });
};
