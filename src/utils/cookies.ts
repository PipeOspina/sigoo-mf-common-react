export const getCookie = (name: string): string | null => {
  if (!document) return null;
  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split("=")[1] ?? null
  );
};

type CookieOptions = {
  domain?: string;
  expires?: Date;
  maxAge?: number;
  partitioned?: boolean;
  path?: string;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
};

const parseOption = <Key extends keyof CookieOptions>(
  key: Key,
  value: CookieOptions[Key]
) => {
  switch (key) {
    case "expires":
      return `; expires=${(value as Date)?.toUTCString() ?? ""}`;
    case "maxAge":
      return `; max-age=${value ?? ""}`;
    case "partitioned":
    case "secure":
      return `; ${key}`;
    default:
      return `; ${key.toLowerCase()}=${value ?? ""}`;
  }
};

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions
) => {
  if (!document) return;

  const parsedOptions = Object.entries(options).reduce(
    (prev, [key, value]) =>
      `${prev}${parseOption(key as keyof CookieOptions, value)}`,
    ""
  );

  document.cookie = `${name}=${value}${parsedOptions}`;
};

export const removeCookie = (name: string) =>
  setCookie(name, "", { maxAge: 0 });
