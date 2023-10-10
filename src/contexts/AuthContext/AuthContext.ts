import { createContext } from "react";
import { User } from "../../types";

export type AuthContextState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextState>({
  user: null,
  setUser: () => {},
});
