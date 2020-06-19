import React from 'react';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';

import { SignInTemplate } from '../templates/SignInTemplate';
import { useRequest } from '../hooks';
import { useAuth } from '../utils/auth';

const initialValues = {
  email: '',
  password: '',
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
});

function SignInPageBase({ history }) {
  const auth = useAuth();
  const [signinRequestState, signinRequest] = useRequest();

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: ({ email, password }) => {
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
  });

  return (
    <SignInTemplate
      formal={formal}
      isLoading={signinRequestState.isLoading}
      error={signinRequestState.error}
    />
  );
}

export const SignInPage = withRouter(SignInPageBase);
