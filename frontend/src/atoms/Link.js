import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

export function Link({
  children,
  className,
  as: Component = RouterLink,
  ...rest
}) {
  return (
    <Component className={classNames(className)} {...rest}>
      {children}
    </Component>
  );
}
