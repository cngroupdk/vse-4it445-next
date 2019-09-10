import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { PasswordResetPage } from './pages/PasswordResetPage';
import { QuackDetailPage } from './pages/QuackDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserDetailPage } from './pages/UserDetailPage';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/auth/signin" exact component={SignInPage} />
      <Route path="/auth/signup" exact component={SignUpPage} />
      <Route path="/auth/password-reset" exact component={PasswordResetPage} />
      <Route path="/settings" exact component={SettingsPage} />
      <Route path="/:screenName" exact component={UserDetailPage} />
      <Route path="/:screenName/status/:id" exact component={QuackDetailPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
