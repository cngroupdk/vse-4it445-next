import React from 'react';

import { Quack } from '../molecules/';
import { TopNavigation } from '../organisms/TopNavigation';

export function HomeTemplate() {
  return (
    <>
      <TopNavigation />
      <section className="pa3 pa5-ns bt b--black-10 black-70 bg-white">
        <main class="mw6 center">
          <Quack />
          <Quack />
          <Quack />
        </main>
      </section>
    </>
  );
}
