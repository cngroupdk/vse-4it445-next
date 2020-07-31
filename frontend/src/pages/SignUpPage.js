import React from 'react';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';

import { SignUpTemplate } from '../templates/SignUpTemplate';
import { useRequest } from '../hooks';

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  password: yup
    .string()
    .required()
    .label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password Confirmation'),
});

function SignUpPageBase() {
  const [signupRequestState, signupRequest] = useRequest();

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: ({ email, password, passwordConfirmation }) => {
      signupRequest({
        url: '/v1/auth/signup',
        method: 'POST',
        data: { email, password, passwordConfirmation },
      })
        .then(data => {
          // TODO
          console.log(data);
        })
        .catch(() => {});
    },
  });

  return (
    <SignUpTemplate
      formal={formal}
      isLoading={signupRequestState.isLoading}
      error={signupRequestState.error}
    />
  );
}

export const SignUpPage = withRouter(SignUpPageBase);
