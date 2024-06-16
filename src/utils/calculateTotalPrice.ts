import { IFood } from "@/store/models/IFood";

const calculateTotalPrice = (foods: IFood[]): number => {
  return foods.reduce((sum, food) => sum + food.price, 0);
};

export default calculateTotalPrice;
