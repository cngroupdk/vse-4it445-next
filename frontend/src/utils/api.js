import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { mocks } from './mocks';

const initialState = {
  _mocks: mocks,
  api: null, // TODO: replace with `new Axios()` here to disable API mocking
};

const ApiStateContext = createContext(initialState);
const ApiDispatchContext = createContext(() =>
  console.warn('Warning: ApiDispatchContext is not provided!'),
);

export function ApiProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  return (
    <ApiDispatchContext.Provider value={dispatch}>
      <ApiStateContext.Provider value={state}>
        {children}
      </ApiStateContext.Provider>
    </ApiDispatchContext.Provider>
  );
}

function contextReducer(state, action) {
  switch (action.type) {
    default:
      throw new Error(`Unknown contextReducer action type: ${action.type}`);
  }
}

export function useFetcher(url, options) {
  const api = useApi();
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    data: null,
    refetch() {
      console.info('[api.get] start', url);
      setState(oldState => ({ ...oldState, isLoading: true }));

      api
        .get(url, options)
        .then(({ data }) => {
          console.info('[api.get] success', url, data);
          setState(oldState => ({
            ...oldState,
            isLoading: false,
            error: null,
            data,
          }));
        })
        .catch(error => {
          console.info('[api.get] error', url, error);
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
  const contextState = useContext(ApiStateContext);
  if (contextState.api) return contextState.api; // TODO: this will replace MockAPI wit true Axios

  const MOCK_API_DELAY = 500;
  const MOCK_FAIL = !true;

  function mockPromise(data, forceError) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (forceError || MOCK_FAIL) {
          return reject(new Error(forceError || 'API Error'));
        }
        resolve({ data });
      }, MOCK_API_DELAY);
    });
  }

  return {
    get(url) {
      if (url === '/api/timeline') {
        return mockPromise({
          quacks: getMockQuacks(contextState),
        });
      }

      if (url.startsWith('/api/user/')) {
        const match = url.match(/\/api\/user\/([^/]+)/);
        const user = getMockUser(contextState, (match && match[1]) || '');
        if (!user) return mockPromise(null, 'Error 404: User Not Found!');

        return mockPromise({
          user,
        });
      }

      return mockPromise(
        null,
        `Error 404: Mock API call "${url}" not implemented.`,
      );
    },
  };
}

function getMockQuacks(contextState) {
  const { quacks, users } = contextState._mocks;
  return quacks.map(quack => ({
    ...quack,
    userId: undefined,
    user: users.find(({ id }) => id === quack.userId),
  }));
}

function getMockUser(contextState, screenName) {
  const { quacks, users } = contextState._mocks;

  const user = users.find(user => screenName === user.screenName);
  if (!user) return null;

  return {
    ...user,
    quacks: quacks
      .filter(({ userId }) => userId === user.id)
      .map(quack => ({
        ...quack,
        userId: undefined,
        user,
      })),
  };
}
