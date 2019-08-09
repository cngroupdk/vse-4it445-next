import React from 'react';
import 'tachyons';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApiProvider } from './utils/api';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserDetailPage } from './pages/UserDetailPage';
import { QuackDetailPage } from './pages/QuackDetailPage';
import { PageNotFound } from './pages/PageNotFound';

function App() {
  return (
    <ApiProvider>
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/auth/signin" exact component={SignInPage} />
            <Route path="/auth/signup" exact component={SignUpPage} />
            <Route path="/:screenName" exact component={UserDetailPage} />
            <Route
              path="/:screenName/status/:id"
              exact
              component={QuackDetailPage}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </main>
    </ApiProvider>
  );
}

export default App;
