import { FC, PropsWithChildren, useState } from "react";
import { User } from "../../types";
import { AuthContext } from "./AuthContext";

export type AuthProviderProps = PropsWithChildren<{}>;

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
