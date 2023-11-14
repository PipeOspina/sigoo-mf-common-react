import { getPermissions, getTerminals } from "@/api";
import { authPaths, envs } from "@/consts";
import { Session, UserPermissions } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "./cookies";
import { validateToken } from "./jwt";

export const buildLoginURL = (appURL: string) => {
  const url = new URL(authPaths.login, envs.AUTH_URL);

  url.searchParams.set("client_id", "coordinadora");
  url.searchParams.set("response_type", "id_token");
  url.searchParams.set("scope", "openid+email+profile");
  url.searchParams.set("prompt", "");
  url.searchParams.set("nonce", uuidv4());
  url.searchParams.set("redirect_uri", appURL);

  return url.toString();
};

export const buildLogoutURL = (token: string, appURL: string) => {
  const url = new URL(authPaths.logout, envs.AUTH_URL);

  url.searchParams.set("post_logout_redirect_uri", appURL);
  url.searchParams.set("id_token_hint", token);

  return url.toString();
};

export const logout = (appURL: string) => {
  if (!window?.location) return;

  const token = getCookie("access_token");
  window.location.href = token
    ? buildLogoutURL(token, appURL)
    : buildLoginURL(appURL);
};

export const getLocalToken = () => {
  if (!window?.location) return null;

  const url = new URL(window.location.href);
  const paramsToken = url.searchParams.get("access_token");
  const cookieToken = getCookie("access_token");

  const token = paramsToken ?? cookieToken;

  if (paramsToken) {
    url.searchParams.delete("access_token");
    if (url.hash.includes(token)) url.hash = "";
    window.history.replaceState(null, "", url);
  }

  return token;
};

export const getUserPermissions = async (
  token: string,
  appId: string
): Promise<UserPermissions> => {
  const [permissionsResponse, terminalsResponse] = await Promise.allSettled([
    getPermissions(appId, token),
    getTerminals(),
  ]);

  const terminals =
    terminalsResponse.status === "fulfilled" &&
    permissionsResponse.status === "fulfilled"
      ? terminalsResponse.value.data.filter(({ codigo_terminal }) => {
          return permissionsResponse.value.response?.terminales?.find(
            ({ id }) => codigo_terminal === id
          );
        })
      : [];

  const menus: UserPermissions["menus"] =
    permissionsResponse.status === "fulfilled"
      ? JSON.parse(permissionsResponse.value.response?.menus ?? "[]")
      : [];

  return { terminals, menus };
};

export const validateSession = async (
  appURL: string,
  appId: string
): Promise<Session | null> => {
  if (!window?.location) return null;

  const token = getLocalToken();
  if (!token) {
    window.location.href = buildLoginURL(appURL);
    return null;
  }

  const [user, permissions] = await Promise.allSettled([
    validateToken(token),
    getUserPermissions(token, appId),
  ]);

  if (user.status === "rejected" || permissions.status === "rejected") {
    window.location.href = buildLoginURL(appURL);
    return null;
  }

  const expDate = new Date((user.value.exp ?? 1) * 1000);
  setCookie("access_token", token, { expires: expDate, secure: true });

  return {
    user: user.value,
    permissions: permissions.value,
  };
};
