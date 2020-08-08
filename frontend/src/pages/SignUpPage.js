import React from 'react';

import { SignUpTemplate } from '../templates/SignUpTemplate';
import { useRequest } from '../hooks';

export function SignUpPage() {
  const [signupRequestState, signupRequest] = useRequest();

  function handleSignUpFormSubmit({ email, password, passwordConfirmation }) {
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
  }

  return (
    <SignUpTemplate
      isLoading={signupRequestState.isLoading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
