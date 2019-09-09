import * as React from 'react';
import { AxiosResponse, AxiosError } from 'axios';

type Api<T, K> = (args: K) => Promise<AxiosResponse<T>>;

type UseReturn<T, K> = [
  {
    loading: boolean;
    error?: AxiosError<T>;
  } & Partial<AxiosResponse<T>>,
  (args: K) => Promise<void>
];

export default function useApios<T, K = void>(api: Api<T, K>): UseReturn<T, K> {
  const [response, setResponse] = React.useState<AxiosResponse<T>>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<AxiosError<T>>();

  const fetch = React.useCallback(async (args: K) => {
    setLoading(true);
    try {
      const res = await api(args);
      setResponse(res);
      setError(undefined);
    } catch (err) {
      setResponse(undefined);
      setError(err);
    }
    setLoading(false);
  }, []);

  const res = {
    ...response,
    loading,
    error,
  };

  return [res, fetch];
}
