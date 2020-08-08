import React from 'react';
import { useHistory } from 'react-router-dom';

import { SignInTemplate } from '../templates/SignInTemplate';
import { useRequest } from '../hooks';
import { useAuth } from '../utils/auth';

export function SignInPage() {
  const auth = useAuth();
  const [signinRequestState, signinRequest] = useRequest();
  const history = useHistory();

  function handleSignInFormSubmit({ email, password }) {
    signinRequest({
      url: '/v1/auth/signin',
      method: 'POST',
      data: { email, password },
    })
      .then(({ data }) => {
        const { token, user } = data;

        auth.signin({ token, user });

        history.replace('/');
      })
      .catch(() => {});
  }

  return (
    <SignInTemplate
      isLoading={signinRequestState.isLoading}
      error={signinRequestState.error}
      onSubmit={handleSignInFormSubmit}
    />
  );
}
