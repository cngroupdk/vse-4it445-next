import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Button, ErrorBanner } from '../atoms/';
import { FormField } from '../molecules/';

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password Confirmation'),
});

export function SignUpForm({
  isLoading,
  errorMessage,
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
        <FormField
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="e.g. john@doe.com"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Button type="submit" className="mt2 mb3">
          Sign Up
          {isLoading && (
            <FontAwesomeIcon className="ml3" icon={faFeatherAlt} spin />
          )}
        </Button>
        {children}
      </Form>
    </Formik>
  );
}
