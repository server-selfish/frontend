// src/lib/params.ts

type NavigateFn<TSearch extends Record<string, unknown>> = (opts: {
  search?: (prev: TSearch) => TSearch;
  replace?: boolean;
  // ...other TanStack Router navigate options if needed
}) => void;

interface SetSearchParamsOptions {
  replace?: boolean;
  // Add more options if needed
}

export function setSearchParams<TSearch extends Record<string, unknown>>(
  navigate: NavigateFn<TSearch>,
  params: Partial<TSearch>,
  options?: SetSearchParamsOptions
) {
  navigate({
    search: (prev) => ({
      ...prev,
      ...params,
    }),
    ...(options || {}),
  });
}
