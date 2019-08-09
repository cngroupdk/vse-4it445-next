import React from 'react';
import classNames from 'classnames';

export function Button({ children, className, ...rest }) {
  return (
    <button
      className={classNames(
        'dib white bg-animate bg-green hover-bg-dark-green pv2 ph4 br-pill bn',
        className,
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
