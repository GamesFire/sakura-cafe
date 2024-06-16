import type { Status } from "@/types/Status";
import { ITray } from "./ITray";

export interface IOrder {
  id: number;
  status: Status;
  date: Date;
  tray: ITray;
}
