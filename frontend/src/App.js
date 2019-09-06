import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApiProvider } from './utils/api';
import { AuthProvider } from './utils/auth';
import { Routes } from './Routes';

function AllProviders({ children }) {
  return (
    <AuthProvider>
      <ApiProvider>{children}</ApiProvider>
    </AuthProvider>
  );
}

export function App() {
  return (
    <AllProviders>
      <main>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </main>
    </AllProviders>
  );
}
