import { IFood } from "../IFood";
import { IUser } from "../IUser";

export interface RatingResponse {
  id: number;
  rate: number;
  user: IUser;
  food: IFood;
}
