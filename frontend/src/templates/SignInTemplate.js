import React from 'react';

import { Heading, Link, MainSection } from '../atoms/';
import { SignInForm, TopNavigation } from '../organisms/';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign In</Heading>

        <SignInForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          className="mt3"
          onSubmit={onSubmit}
        >
          <div className="lh-copy">
            <Link className="db f5 dark-green" to="/auth/signup">
              Sign Up
            </Link>
            <Link className="db f5 dark-green" to="/auth/password-reset">
              Forgot your password?
            </Link>
          </div>
        </SignInForm>
      </MainSection>
    </>
  );
}
