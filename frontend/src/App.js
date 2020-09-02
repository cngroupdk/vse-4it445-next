import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { ScrollToTop } from 'src/atoms/';
import { AuthProvider } from 'src/utils/auth';
import { Routes } from 'src/Routes';
import { client } from 'src/utils/apolloClient';

export function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}
