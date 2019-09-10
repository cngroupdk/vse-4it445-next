import React from 'react';
import { withRouter } from 'react-router-dom';

import { SignInTemplate } from '../templates/SignInTemplate';
import { useAuth } from '../utils/auth';
import { users as mockUsers } from '../utils/mocks';

function SignInPageBase({ history }) {
  const { signin } = useAuth();

  return (
    <SignInTemplate
      onSubmit={() => {
        const user = mockUsers[0];

        signin({
          token: 'fake-token',
          user,
        });

        history.replace(`/${user.screenName}`);
      }}
    />
  );
}

export const SignInPage = withRouter(SignInPageBase);
