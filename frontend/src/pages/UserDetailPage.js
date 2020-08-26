import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UserDetailTemplate } from '../templates/UserDetailTemplate';
import { PageNotFound } from './PageNotFound';
import { useAuth } from '../utils/auth';
import { useFetchRequest } from '../hooks';

export function UserDetailPage() {
  const { user } = useAuth();
  const { screenName } = useParams();
  const url = `/v1/user/${screenName}`;
  const [userFetcher, refetchUser] = useFetchRequest({
    lazy: true,
    url,
  });

  useEffect(() => {
    refetchUser({ url });
  }, [refetchUser, url]);

  const [quackFormText, setQuackFormText] = useState('');
  const submitQuack = ({ text }) => {
    console.log('quack:', text);
    setQuackFormText('');
  };

  const quackFormState = {
    text: quackFormText,
    setText: setQuackFormText,
    onSubmit: submitQuack,
  };

  const { error } = userFetcher;
  if (error && error.response && error.response.status === 404) {
    return <PageNotFound />;
  }

  return (
    <UserDetailTemplate
      userFetcher={userFetcher}
      onReload={() => refetchUser()}
      quackFormState={quackFormState}
      currentUser={user}
      screenName={screenName}
    />
  );
}
