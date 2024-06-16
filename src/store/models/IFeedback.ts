import { IUser } from "./IUser";

export interface IFeedback {
  id: number;
  subject: string;
  message: string;
  date: Date;
  isProcessed: boolean;
  user: IUser;
}
