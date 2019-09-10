import React from 'react';

import { Button } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

export function SignInTemplate({ onSubmit }) {
  return (
    <>
      <TopNavigation />
      <div className="pa3 bt b--black-10">
        <section className="mw6 center">
          <header>
            <h1>Sign In</h1>
          </header>
          <main>
            <Button onClick={onSubmit}>Sign In</Button>
          </main>
        </section>
      </div>
    </>
  );
}
