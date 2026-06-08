import { getCookies, setCookie } from "@tanstack/react-start/server";
import axios, { type Options, type Response } from "redaxios";
import setCookieParser from "set-cookie-parser";
import * as env from "@/const/env";
import { BACKEND_BASE_URL } from "@/const/env";

type RequestConfig = Options;

// Helper function to check for HTTP errors
export const isHttpError = (e: unknown): e is { status?: number } => {
  return typeof e === "object" && e !== null && "status" in e;
};

// Global refresh promise
let refreshPromise: Promise<{
  cookieHeader?: string;
}> | null = null;

// Build cookie header string
const getCookieHeader = () => {
  const cookies = getCookies();

  if (!cookies) return undefined;

  return Object.entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
};

// Cookie-only auth headers
const getAuthHeaders = (cookieHeader?: string) => {
  return {
    ...(cookieHeader
      ? { Cookie: cookieHeader }
      : getCookieHeader()
      ? { Cookie: getCookieHeader()! }
      : {}),
  };
};

const requestWithAuthRetry = async <T>(
  requestFn: (cookieHeader?: string) => Promise<T>,
  cookieHeader?: string
): Promise<T> => {
  try {
    return await requestFn(cookieHeader);
  } catch (error: unknown) {
    if (isHttpError(error) && error.status === 401) {
      if (refreshPromise) {
        const result = await refreshPromise;

        return await requestFn(result.cookieHeader);
      }
      refreshPromise = (async () => {
        try {
          const refreshUrl = BACKEND_BASE_URL + "/auth/refresh";
          const refreshResponse = await axios.post(refreshUrl, undefined, {
            withCredentials: true,
            headers: getAuthHeaders(),
          });

          const setCookieHeaders = refreshResponse.headers.getSetCookie?.();

          const currentCookies = {
            ...(getCookies() || {}),
          };

          let newAccessToken: string | undefined;

          if (setCookieHeaders) {
            const parsedCookies = setCookieParser.parse(setCookieHeaders);

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

              if (cookie.name === "selfish_access_token") {
                newAccessToken = cookie.value;
              }
            }
          }

          const mergedCookies = {
            ...currentCookies,
          };

          if (newAccessToken) {
            mergedCookies.selfish_access_token = newAccessToken;
          }

          const newCookieHeader = Object.entries(mergedCookies)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ");

          return {
            cookieHeader: newCookieHeader,
          };
        } catch (refreshError: unknown) {
          if (isHttpError(refreshError) && refreshError.status === 401) {
            setCookie("selfish_access_token", "", {
              path: "/",
              expires: new Date(0),
            });

            setCookie("selfish_refresh_token", "", {
              path: "/",
              expires: new Date(0),
            });

            try {
              await axios.post(BACKEND_BASE_URL + "/auth/logout", undefined, {
                withCredentials: true,
                headers: getAuthHeaders(),
              });
            } catch (logoutError) {
              console.error("Backend logout failed:", logoutError);
            }
            throw new Error("UNAUTHORIZED");
          }

          throw refreshError;
        }
      })();

      try {
        const result = await refreshPromise;

        return await requestFn(result.cookieHeader);
      } finally {
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
};

// Create API client
export const createApiClient = () => {
  const c = axios.create({
    baseURL: env.BACKEND_BASE_URL,
    withCredentials: true,
  });

  return {
    get: <T>(url: string, config?: RequestConfig) =>
      requestWithAuthRetry((cookieHeaderArg) =>
        c
          .get<T>(url, {
            ...config,
            headers: {
              ...(config?.headers || {}),
              ...getAuthHeaders(cookieHeaderArg),
            },
          })
          .then((r) => r.data)
      ),

    post: <T>(url: string, data?: unknown, config?: RequestConfig) =>
      requestWithAuthRetry((cookieHeaderArg) =>
        c
          .post<T>(url, data, {
            ...config,
            headers: {
              ...(config?.headers || {}),
              ...getAuthHeaders(cookieHeaderArg),
            },
          })
          .then((r) => r.data)
      ),

    patch: <T>(
      url: string,
      data?: unknown,
      config?: RequestConfig
    ): Promise<T> =>
      requestWithAuthRetry((cookieHeaderArg) =>
        c
          .patch<T>(url, data, {
            ...config,
            headers: {
              ...(config?.headers || {}),
              ...getAuthHeaders(cookieHeaderArg),
            },
          })
          .then((r: Response<T>) => r.data)
      ),

    delete: <T>(url: string, config?: RequestConfig): Promise<T> =>
      requestWithAuthRetry((cookieHeaderArg) =>
        c
          .delete<T>(url, {
            ...config,
            headers: {
              ...(config?.headers || {}),
              ...getAuthHeaders(cookieHeaderArg),
            },
          })
          .then((r: Response<T>) => r.data)
      ),
  };
};
