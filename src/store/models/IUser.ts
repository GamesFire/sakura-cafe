import type { Role } from "@/types/Role";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: Role;
}
