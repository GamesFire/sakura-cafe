import { ICategory } from "./ICategory";
import { IIngredient } from "./IIngredient";

export interface IFood {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string | File;
  category: ICategory;
  ingredients: IIngredient[];
}
