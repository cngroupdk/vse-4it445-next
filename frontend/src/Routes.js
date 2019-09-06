import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserDetailPage } from './pages/UserDetailPage';
import { QuackDetailPage } from './pages/QuackDetailPage';
import { PageNotFound } from './pages/PageNotFound';
import { SettingsPage } from './pages/SettingsPage';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/auth/signin" exact component={SignInPage} />
      <Route path="/auth/signup" exact component={SignUpPage} />
      <Route path="/settings" exact component={SettingsPage} />
      <Route path="/:screenName" exact component={UserDetailPage} />
      <Route path="/:screenName/status/:id" exact component={QuackDetailPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
