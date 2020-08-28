import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from 'src/atoms/';
import { ApiProvider } from 'src/utils/api';
import { AuthProvider } from 'src/utils/auth';
import { Routes } from 'src/Routes';

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
