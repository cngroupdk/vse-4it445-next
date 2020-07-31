import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Button, ErrorBanner } from '../atoms/';
import { Field } from '../molecules/';

export function SignUpForm({
  formal,
  isLoading,
  errorMessage,
  className,
  children,
}) {
  return (
    <form className={className} {...formal.getFormProps()}>
      {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}

      <Field
        label="Email"
        type="text"
        placeholder="e.g. john@doe.com"
        autoFocus="autofocus"
        autoComplete="on"
        autoCorrect="off"
        autoCapitalize="off"
        {...formal.getFieldProps('email')}
      />
      <Field
        label="Password"
        type="password"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        {...formal.getFieldProps('password')}
      />
      <Field
        label="Password Confirmation"
        type="password"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        {...formal.getFieldProps('passwordConfirmation')}
      />

      <Button type="submit" className="mt2 mb3">
        Sign Up
        {isLoading && (
          <FontAwesomeIcon className="ml3" icon={faFeatherAlt} spin />
        )}
      </Button>
      {children}
    </form>
  );
}
