import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Button, ErrorBanner } from '../atoms/';
import { Field } from '../molecules/';

export function SignInForm({ formal, isLoading, error, children }) {
  return (
    <form {...formal.getFormProps()}>
      {error && <ErrorBanner title={error} className="mb3" />}
      <Field
        label="Email"
        type="email"
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
      <Button type="submit" className="mt2 mb3">
        Sign In
        {isLoading && (
          <FontAwesomeIcon className="ml3" icon={faFeatherAlt} spin />
        )}
      </Button>
      {children}
    </form>
  );
}
