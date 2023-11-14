import { CommonAuthApiResponse } from "./Common";

export type PermissionTerminal = {
  id: number;
  abreviatura: string;
  codigo_terminal?: string;
  nombre?: string;
  abreviado?: string;
};

export type PermissionsData = {
  id_plataforma: string;
  id_aplicacion: string;
  nombre_aplicacion: string;
  terminales: PermissionTerminal[];
  menus: string;
};

export type PermissionsResponse = CommonAuthApiResponse<PermissionsData>;
