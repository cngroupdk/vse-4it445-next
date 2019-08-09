import React from 'react';

import { TopNavigation } from '../organisms/TopNavigation';

export function PageNotFound() {
  return (
    <div>
      <TopNavigation />
      <section className="mw6 center">
        <h1>Error 404: Page Not Found</h1>
      </section>
    </div>
  );
}
