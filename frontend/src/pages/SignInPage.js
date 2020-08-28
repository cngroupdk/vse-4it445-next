import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { SignInTemplate } from 'src/templates/SignInTemplate';
import { useRequest } from 'src/hooks';
import { useAuth } from 'src/utils/auth';

export function SignInPage() {
  const auth = useAuth();
  const [signinRequestState, signinRequest] = useRequest();
  const history = useHistory();

  const handleSignInFormSubmit = useCallback(
    ({ email, password }) => {
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
    },
    [signinRequest, history, auth],
  );

  return (
    <SignInTemplate
      isLoading={signinRequestState.isLoading}
      error={signinRequestState.error}
      onSubmit={handleSignInFormSubmit}
    />
  );
}
