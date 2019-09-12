import { useEffect, useState, useRef } from 'react';
import { CancelToken } from 'axios';

import { useApi } from './api';
import { config } from '../config';

const log = config.REQUEST_LOGGING ? console.info : () => {};

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
            error: error,
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

export function useFetchRequest(url, { autoStart = false, ...options } = {}) {
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
