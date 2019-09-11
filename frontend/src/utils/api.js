import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import axios, { CancelToken } from 'axios';

import { useAuth } from './auth';

const LOG = true;
const API_MOCK_ENABLED = true;

const api = axios.create({
  baseURL: '/api',
});

const log = LOG ? console.info : () => {};

if (API_MOCK_ENABLED) {
  const { installApiMocks } = require('./api-mock.js');
  installApiMocks(api);
}

const ApiStateContext = createContext(api);

export function ApiProvider({ children }) {
  const { token } = useAuth();

  // Using `useLayoutEffect` instead of `useEffect` because it is triggered
  // earlier then other `useEffect` calls that may already use `api`.
  useLayoutEffect(() => {
    if (!token) {
      delete api.defaults.headers.common['Authorization'];
    } else {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <ApiStateContext.Provider value={api}>{children}</ApiStateContext.Provider>
  );
}

export function useFetcher(url, { autoStart = false, ...options } = {}) {
  const fetchRequest = useRequest(autoStart ? { isLoading: true } : {});

  const refetch = () => {
    fetchRequest.request(url, options);
  };

  useEffect(() => {
    if (autoStart) {
      refetch();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...fetchRequest,
    refetch,
  };
}

export function useRequest(initialState = {}) {
  const api = useApi();
  const apiRef = useRef(api);
  const stateRef = useRef(null);

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const [state, setState] = useState({
    isLoading: false,
    error: null,
    data: null,
    cancelSource: null,
    ...initialState,
    request: (url, { method = 'GET', onSuccess, ...options } = {}) => {
      log(`[api.${method}] start`, url);

      if (stateRef.current) {
        const { cancelSource: previousCancelSource } = stateRef.current;
        if (previousCancelSource) {
          previousCancelSource.cancel('Request canceled.');
        }
      }

      const cancelSource = CancelToken.source();

      setState(oldState => ({ ...oldState, isLoading: true, cancelSource }));

      apiRef.current
        .request({
          url,
          method,
          cancelToken: cancelSource.token,
          ...options,
        })
        .then(response => {
          const { data } = response;
          log(`[api.${method}] success`, url, data);

          setState(oldState => ({
            ...oldState,
            isLoading: false,
            error: null,
            cancelSource: null,
            data,
          }));

          if (onSuccess) {
            onSuccess(response);
          }
        })
        .catch(error => {
          if (cancelSource && cancelSource.token && cancelSource.token.reason) {
            log(`[api.${method}] canceled`, url);
            return;
          }

          log(`[api.${method}] error`, url, error);

          setState(oldState => ({
            ...oldState,
            isLoading: false,
            cancelSource: null,
            error: `${error}`,
          }));
        });
    },
  });

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    return () => {
      if (stateRef.current && stateRef.current.cancelSource) {
        stateRef.current.cancelSource.cancel(
          'Caneling pending request on component unmount.',
        );
      }
    };
  }, []);

  return state;
}

export function useApi() {
  return useContext(ApiStateContext);
}
