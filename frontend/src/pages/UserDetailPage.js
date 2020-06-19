import React, { useState } from 'react';

import { UserDetailTemplate } from '../templates/UserDetailTemplate';
import { PageNotFound } from './PageNotFound';
import { useAuth } from '../utils/auth';
import { useFetchRequest } from '../hooks';

function UserDetailPageBase({ screenName }) {
  const { user } = useAuth();
  const [userFetcher, refetchUser] = useFetchRequest(`/v1/user/${screenName}`);

  const onLikePress = quack => {
    console.log('like:', quack);
  };

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
      onLikePress={onLikePress}
      quackFormState={quackFormState}
      currentUser={user}
      screenName={screenName}
    />
  );
}

export function UserDetailPage({ match }) {
  const { screenName } = match.params;
  return <UserDetailPageBase key={screenName} screenName={screenName} />;
}
