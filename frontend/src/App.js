import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from './atoms/';
import { ApiProvider } from './utils/api';
import { AuthProvider } from './utils/auth';
import { Routes } from './Routes';

export function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes />
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  );
}