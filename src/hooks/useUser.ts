import { useContext } from "react";
import { AuthContext } from "../contexts";
import { User } from "../types";

export const useUser = (): User | null => {
  const { user } = useContext(AuthContext);
  return user;
};
