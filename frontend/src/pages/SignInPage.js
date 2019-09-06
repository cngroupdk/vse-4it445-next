import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from '../atoms/';
import { Placeholder } from '../templates/Placeholder';
import { useAuth } from '../utils/auth';
import { users as mockUsers } from '../utils/mocks';

function SignInPageBase({ history }) {
  const { signin } = useAuth();

  return (
    <Placeholder title="Sing In">
      <Button
        onClick={() => {
          const user = mockUsers[0];

          signin({
            token: 'fake-token',
            user,
          });
          history.replace(`/${user.screenName}`);
        }}
      >
        Sign In
      </Button>
    </Placeholder>
  );
}

export const SignInPage = withRouter(SignInPageBase);
