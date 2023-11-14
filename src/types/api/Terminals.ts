import { CommonApiResponse } from "./Common";

export type TerminalData = {
  codigo_terminal: number;
  nombre: string;
  abreviado: string;
  nombre_departamento: string;
};

export type TerminalResponse = CommonApiResponse<TerminalData[]>;
