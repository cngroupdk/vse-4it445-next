import React from 'react';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';

import { SignInTemplate } from '../templates/SignInTemplate';
import { useRequest } from '../utils/request';
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
  const signinRequest = useRequest();

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: ({ email, password }) => {
      signinRequest.request('/v1/auth/signin', {
        method: 'POST',
        data: { email, password },
        onSuccess: ({ data }) => {
          const { token, user } = data;

          auth.signin({
            token,
            user,
          });

          history.replace('/');
        },
      });
    },
  });

  return (
    <SignInTemplate
      formal={formal}
      isLoading={signinRequest.isLoading}
      error={signinRequest.error}
    />
  );
}

export const SignInPage = withRouter(SignInPageBase);
