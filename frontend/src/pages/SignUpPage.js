import React, { useCallback } from 'react';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';
import { useRequest } from 'src/hooks';

export function SignUpPage() {
  const [signupRequestState, signupRequest] = useRequest();

  const handleSignUpFormSubmit = useCallback(
    ({ email, password, passwordConfirmation }) => {
      signupRequest({
        url: '/v1/auth/signup',
        method: 'POST',
        data: { email, password, passwordConfirmation },
      })
        .then((data) => {
          // TODO
          console.log(data);
        })
        .catch(() => {});
    },
    [signupRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signupRequestState.isLoading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
