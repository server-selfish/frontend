import { getCookies, setCookie } from "@tanstack/react-start/server";
import axios, { type Options, type Response } from "redaxios";
import setCookieParser from "set-cookie-parser";
import * as env from "@/const/env";
import { BACKEND_BASE_URL } from "@/const/env";

type RequestConfig = Options;

export const createApiClient = () => {
  const cookies = getCookies();
  const accessToken = cookies?.selfish_access_token;

  const cookieHeader = cookies
    ? Object.entries(cookies)
        .filter(([key]) => key !== "selfish_access_token") // exclude if you want only in Authorization
        .map(([key, value]) => `${key}=${value}`)
        .join("; ")
    : undefined;

  const authorizationHeader = accessToken ? `Bearer ${accessToken}` : undefined;

  const headers: Record<string, string> = {};
  if (cookieHeader) headers["Cookie"] = cookieHeader;
  if (authorizationHeader) headers["Authorization"] = authorizationHeader;

  const c = axios.create({
    baseURL: env.BACKEND_BASE_URL,
    withCredentials: true,
    headers,
  });

  return {
    get: <T>(url: string, config?: RequestConfig) =>
      requestWithAuthRetry(
        (cookieHeaderArg, authorizationHeaderArg) =>
          c
            .get<T>(url, {
              ...config,
              headers: {
                ...headers,
                ...(config?.headers || {}),
                ...(cookieHeaderArg ? { Cookie: cookieHeaderArg } : {}),
                ...(authorizationHeaderArg
                  ? { Authorization: authorizationHeaderArg }
                  : {}),
              },
            })
            .then((r) => r.data),
        cookieHeader,
        authorizationHeader
      ),

    post: <T>(url: string, data?: unknown, config?: RequestConfig) =>
      requestWithAuthRetry(
        (cookieHeaderArg, authorizationHeaderArg) =>
          c
            .post<T>(url, data, {
              ...config,
              headers: {
                ...headers,
                ...(config?.headers || {}),
                ...(cookieHeaderArg ? { Cookie: cookieHeaderArg } : {}),
                ...(authorizationHeaderArg
                  ? { Authorization: authorizationHeaderArg }
                  : {}),
              },
            })
            .then((r) => r.data),
        cookieHeader,
        authorizationHeader
      ),

    patch: <T>(
      url: string,
      data?: unknown,
      config?: RequestConfig
    ): Promise<T> =>
      requestWithAuthRetry(
        (cookieHeaderArg, authorizationHeaderArg) =>
          c
            .patch<T>(url, data, {
              ...config,
              headers: {
                ...headers,
                ...(config?.headers || {}),
                ...(cookieHeaderArg ? { Cookie: cookieHeaderArg } : {}),
                ...(authorizationHeaderArg
                  ? { Authorization: authorizationHeaderArg }
                  : {}),
              },
            })
            .then((r: Response<T>) => r.data),
        cookieHeader,
        authorizationHeader
      ),

    delete: <T>(url: string, config?: RequestConfig): Promise<T> =>
      requestWithAuthRetry(
        (cookieHeaderArg, authorizationHeaderArg) =>
          c
            .delete<T>(url, {
              ...config,
              headers: {
                ...headers,
                ...(config?.headers || {}),
                ...(cookieHeaderArg ? { Cookie: cookieHeaderArg } : {}),
                ...(authorizationHeaderArg
                  ? { Authorization: authorizationHeaderArg }
                  : {}),
              },
            })
            .then((r: Response<T>) => r.data),
        cookieHeader,
        authorizationHeader
      ),
  };
};

export const isHttpError = (e: unknown): e is { status?: number } => {
  return typeof e === "object" && e !== null && "status" in e;
};

let refreshPromise: Promise<{
  cookieHeader?: string;
  authorizationHeader?: string;
}> | null = null;

const requestWithAuthRetry = async <T>(
  requestFn: (
    cookieHeader?: string,
    authorizationHeader?: string
  ) => Promise<T>,
  cookieHeader?: string,
  authorizationHeader?: string
): Promise<T> => {
  try {
    return await requestFn(cookieHeader, authorizationHeader);
  } catch (error: unknown) {
    if (isHttpError(error) && error.status === 401) {
      // TODO: if refresh_token is missing just throw error to logout

      if (refreshPromise) {
        const {
          cookieHeader: newCookieHeader,
          authorizationHeader: newAuthorizationHeader,
        } = await refreshPromise;
        return await requestFn(newCookieHeader, newAuthorizationHeader);
      }
      refreshPromise = (async () => {
        try {
          const refreshResponse = await axios.post(
            BACKEND_BASE_URL + "/auth/refresh",
            undefined,
            {
              withCredentials: true,
              headers: cookieHeader ? { Cookie: cookieHeader } : {},
            }
          );

          const setCookieHeaders = refreshResponse.headers.getSetCookie?.();
          let newCookies: Record<string, string> = {};
          if (setCookieHeaders) {
            const parsedCookies = setCookieParser.parse(setCookieHeaders);
            newCookies = Object.fromEntries(
              Object.entries(parsedCookies).map(([k, v]) => [k, v.value])
            );
            for (const cookie of parsedCookies) {
              setCookie(cookie.name, cookie.value, {
                path: cookie.path,
                httpOnly: cookie.httpOnly,
                secure: cookie.secure,
                sameSite: cookie.sameSite
                  ? (cookie.sameSite.toLowerCase() as "lax" | "strict" | "none")
                  : undefined,
                expires: cookie.expires,
                maxAge: cookie.maxAge,
                domain: cookie.domain,
              });
              newCookies[cookie.name] = cookie.value;
            }
          }

          const newCookieHeader = Object.entries(newCookies)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ");

          const newAccessToken =
            refreshResponse.data?.data?.AccessToken ||
            refreshResponse.data?.data?.accessToken ||
            newCookies["selfish_access_token"];

          const newAuthorizationHeader = newAccessToken
            ? `Bearer ${newAccessToken}`
            : authorizationHeader;

          return {
            cookieHeader: newCookieHeader,
            authorizationHeader: newAuthorizationHeader,
          };
        } catch (refreshError: unknown) {
          if (isHttpError(refreshError) && refreshError.status === 401) {
            //TODO: logout
            throw new Error("UNAUTHORIZED");
          }
          throw refreshError;
        } finally {
          refreshPromise = null;
        }
      })();
      const result = await refreshPromise;
      if (!result) {
        throw new Error("Refresh promise unexpectedly null");
      }
      const {
        cookieHeader: newCookieHeader,
        authorizationHeader: newAuthorizationHeader,
      } = result;
      return await requestFn(newCookieHeader, newAuthorizationHeader);
    }
    throw error;
  }
};
