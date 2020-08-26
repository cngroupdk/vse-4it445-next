import React from 'react';

import { Heading, Link, MainSection } from '../atoms/';
import { SignUpForm, TopNavigation } from '../organisms/';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign Up</Heading>

        <SignUpForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          className="mt3"
          onSubmit={onSubmit}
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
