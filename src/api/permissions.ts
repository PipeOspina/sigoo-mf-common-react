import { authPaths, envs } from "@/consts";
import { PermissionsResponse } from "@/types";

export const getPermissions = async (appId: string, token: string) => {
  const url = new URL(authPaths.permissions, envs.AUTH_URL);

  url.searchParams.set("id_aplicacion", appId);

  const permissions: PermissionsResponse = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

  return permissions;
};
