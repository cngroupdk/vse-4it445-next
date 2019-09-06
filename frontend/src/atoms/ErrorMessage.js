import React from 'react';
import classNames from 'classnames';

export function ErrorMessage({ className, ...props }) {
  return <dif className={classNames('red b f5 pa3', className)} {...props} />;
}
