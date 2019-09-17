import React from 'react';

import { Heading, Link, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { SignInForm } from '../organisms/SignInForm';

export function SignInTemplate({ formal, isLoading, error }) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign In</Heading>

        <SignInForm
          formal={formal}
          isLoading={isLoading}
          errorMessage={error && error.message}
          className="mt3"
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
