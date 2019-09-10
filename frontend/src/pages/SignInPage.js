import React from 'react';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';

import { SignInTemplate } from '../templates/SignInTemplate';
import { useAuth } from '../utils/auth';
import { users as mockUsers } from '../utils/mocks';

const initialValues = {
  username: '',
  password: '',
};

const schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .label('Email or username'),
  password: yup
    .string()
    .required()
    .label('Password'),
});

function SignInPageBase({ history }) {
  const { signin } = useAuth();
  const formal = useFormal(initialValues, {
    schema,
    onSubmit: values => {
      console.log('Your values are:', values);
      const user = mockUsers[0];

      signin({
        token: 'fake-token',
        user,
      });

      history.replace('/');
    },
  });

  return <SignInTemplate formal={formal} />;
}

export const SignInPage = withRouter(SignInPageBase);
