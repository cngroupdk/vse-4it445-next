import React from 'react';

import { Button } from '../atoms/';
import { Field } from '../molecules/';

export function SignInForm({ formal, children }) {
  return (
    <form {...formal.getFormProps()}>
      <Field
        label="Email or username"
        placeholder="e.g. john@doe.com"
        autoFocus="autofocus"
        autoComplete="on"
        autoCorrect="off"
        autoCapitalize="off"
        {...formal.getFieldProps('username')}
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
      </Button>
      {children}
    </form>
  );
}
