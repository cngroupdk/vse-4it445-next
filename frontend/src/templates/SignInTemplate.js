import React from 'react';

import { Link } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { SignInForm } from '../organisms/SignInForm';

export function SignInTemplate({ formal }) {
  return (
    <>
      <TopNavigation />
      <div className="pa3 bt b--black-10">
        <section className="mw6 center">
          <header>
            <h1>Sign In</h1>
          </header>
          <main>
            <SignInForm formal={formal}>
              <div className="lh-copy">
                <Link className="db f5 dark-green" to="/auth/signup">
                  Sign Up
                </Link>
                <Link className="db f5 dark-green" to="/auth/password-reset">
                  Forgot your password?
                </Link>
              </div>
            </SignInForm>
          </main>
        </section>
      </div>
    </>
  );
}
