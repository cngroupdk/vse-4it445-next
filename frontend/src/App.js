import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ApiProvider } from './utils/api';
import { AuthProvider } from './utils/auth';
import { Routes } from './Routes';

function AllProviders({ children }) {
  return (
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  );
}

export function App() {
  return (
    <AllProviders>
      <main>
        <Routes />
      </main>
    </AllProviders>
  );
}
