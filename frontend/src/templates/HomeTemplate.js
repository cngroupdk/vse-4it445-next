import React from 'react';

import { Quack } from '../molecules/';
import { TopNavigation } from '../organisms/TopNavigation';

export function HomeTemplate({ quacks, onLikePress }) {
  return (
    <>
      <TopNavigation />
      <section className="pa3 bt b--black-10">
        <main className="mw6 center">
          {quacks.map(quack => (
            <Quack key={quack.id} quack={quack} onLikePress={onLikePress} />
          ))}
        </main>
      </section>
    </>
  );
}
