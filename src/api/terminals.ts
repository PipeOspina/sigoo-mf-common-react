import { apiPaths, envs } from "@/consts";
import { TerminalResponse } from "@/types";

export const getTerminals = async () => {
  const url = new URL(apiPaths.terminals, envs.API_URL);

  const terminals: TerminalResponse = await fetch(url).then((res) =>
    res.json()
  );

  return terminals;
};
