import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserDetailPage } from './pages/UserDetailPage';

export const route = {
  home: () => `/`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  userDetail: (screenName) => `/${screenName}`,
};

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/auth/signin" exact component={SignInPage} />
      <Route path="/auth/signup" exact component={SignUpPage} />
      <Route path="/:screenName" exact component={UserDetailPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
