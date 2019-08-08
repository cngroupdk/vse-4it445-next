import React from 'react';
import classNames from 'classnames';

export function Link({ children, className, ...rest }) {
  return (
    <a
      className={classNames('link no-underline underline-hover', className)}
      {...rest}
    >
      {children}
    </a>
  );
}
