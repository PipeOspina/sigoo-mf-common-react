export type CommonApiResponse<DataType = unknown> = {
  isError: boolean;
  status: string;
  data?: DataType | null;
  error?: string | null;
  errorMessage?: string | null;
  errorCode?: number | null;
};

export type CommonAuthApiResponse<ResponseType = unknown> = {
  isError: boolean;
  response?: ResponseType | null;
};
