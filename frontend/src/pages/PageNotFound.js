import React from 'react';

import { Link } from 'src/atoms';
import { route } from 'src/Routes';

export function PageNotFound() {
  return (
    <p>
      Page not found, please return to <Link to={route.home()}>Home</Link>.
    </p>
  );
}
