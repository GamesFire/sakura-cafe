import { IUser } from "./IUser";
import { IFood } from "./IFood";

export interface ITray {
  id: number;
  user: IUser;
  foods: IFood[];
}
