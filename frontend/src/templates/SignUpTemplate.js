import React from 'react';

import { Heading, Link, MainSection } from '../atoms/';
import { SignUpForm, TopNavigation } from '../organisms/';

export function SignUpTemplate({ formal, isLoading, error }) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign Up</Heading>

        <SignUpForm
          formal={formal}
          isLoading={isLoading}
          errorMessage={error && error.message}
          className="mt3"
        >
          <div className="lh-copy">
            <Link className="db f5 dark-green" to="/auth/signin">
              Sign In
            </Link>
          </div>
        </SignUpForm>
      </MainSection>
    </>
  );
}
