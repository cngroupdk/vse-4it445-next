import React from 'react';

import { TopNavigation } from '../organisms/TopNavigation';

export function Placeholder({ title, children }) {
  return (
    <div>
      <TopNavigation />
      <section className="mw6 center">
        <h1>{title}</h1>
        {typeof children === 'undefined' ? (
          <p>This page is empty for now...</p>
        ) : (
          children
        )}
      </section>
    </div>
  );
}
