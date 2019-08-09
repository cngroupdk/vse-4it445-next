import React from 'react';
import 'tachyons';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
