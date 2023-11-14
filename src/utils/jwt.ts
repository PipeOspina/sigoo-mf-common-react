import { authPaths, envs } from "@/consts";
import { JWTPayload, createRemoteJWKSet, jwtVerify } from "jose";
import { User } from "../types";

export const JWKS = createRemoteJWKSet(new URL(authPaths.JWKS, envs.AUTH_URL));

export const validateToken = async (token: string) => {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: envs.AUTH_URL,
    audience: "coordinadora",
    algorithms: ["RS256"],
  });

  return payload as JWTPayload & User;
};
