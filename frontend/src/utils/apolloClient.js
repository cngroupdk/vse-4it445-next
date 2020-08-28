import { ApolloClient, InMemoryCache } from '@apollo/client';

import { config } from 'src/config';

export const client = new ApolloClient({
  uri: config.GRAPHQL_API,
  cache: new InMemoryCache(),
});
