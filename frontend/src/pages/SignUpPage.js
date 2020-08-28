import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';

const SIGNUP_MUTATION = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signup(
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      email
    }
  }
`;

export function SignUpPage() {
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup: { email } }) => {
      console.log(email);
    },
  });

  const handleSignUpFormSubmit = useCallback(
    (variables) => {
      signupRequest({ variables });
    },
    [signupRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signupRequestState.loading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
