import React from 'react';

import { TopNavigation } from '../organisms/TopNavigation';

export function Placeholder({ title, children }) {
  return (
    <>
      <TopNavigation />
      <div className="pa3 bt b--black-10">
        <section className="mw6 center">
          <h1>{title}</h1>
          {typeof children === 'undefined' ? (
            <p>This page is empty for now...</p>
          ) : (
            children
          )}
        </section>
      </div>
    </>
  );
}
