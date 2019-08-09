import React from 'react';

import { Quack, QuackForm } from '../molecules/';
import { TopNavigation } from '../organisms/TopNavigation';

export function HomeTemplate({ quacks, onLikePress, quackFormState }) {
  return (
    <>
      <TopNavigation />
      <div className="pa3 bt b--black-10">
        <section className="mw6 center">
          <header>
            <h1>Home</h1>
          </header>
          <QuackForm {...quackFormState} />
          <main>
            {quacks.map(quack => (
              <Quack key={quack.id} quack={quack} onLikePress={onLikePress} />
            ))}
          </main>
        </section>
      </div>
    </>
  );
}
