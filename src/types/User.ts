import { JWTPayload } from "jose";
import { TerminalData } from "./api";

export type User = {
  _id?: number;
  abreviado?: string;
  fullName: string;
  name: string;
  preferred_username?: string;
  terminal: number;
};

export type UserPermissions = {
  menus: {
    id: string;
    nombre: string;
  }[];
  terminals: TerminalData[];
};

export type Session = {
  user: JWTPayload & User;
  permissions: UserPermissions;
};
