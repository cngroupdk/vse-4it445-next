import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const LOG = true;
const API_MOCK_ENABLED = true;

const api = axios.create({
  baseURL: '/api',
});

if (API_MOCK_ENABLED) {
  const { installApiMocks } = require('./api-mock.js');
  installApiMocks(api);
}

const initialState = { api };

const ApiStateContext = createContext(initialState);
const ApiDispatchContext = createContext(() =>
  console.warn('Warning: ApiDispatchContext is not provided!'),
);

export function ApiProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <ApiDispatchContext.Provider value={setState}>
      <ApiStateContext.Provider value={state}>
        {children}
      </ApiStateContext.Provider>
    </ApiDispatchContext.Provider>
  );
}

export function useFetcher(url, options) {
  const api = useApi();

  const log = LOG ? console.info : () => {};

  const [state, setState] = useState({
    isLoading: true,
    error: null,
    data: null,
    refetch: () => {
      log('[api.get] start', url);

      setState(oldState => ({ ...oldState, isLoading: true }));

      api
        .get(url, options)
        .then(({ data }) => {
          log('[api.get] success', url, data);

          setState(oldState => ({
            ...oldState,
            isLoading: false,
            error: null,
            data,
          }));
        })
        .catch(error => {
          log('[api.get] error', url, error);

          setState(oldState => ({
            ...oldState,
            isLoading: false,
            error,
          }));
        });
    },
  });

  useEffect(state.refetch, []);

  return state;
}

function useApi() {
  const { api } = useContext(ApiStateContext);
  return api;
}
