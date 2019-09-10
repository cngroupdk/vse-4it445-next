import React, { useState } from 'react';

import { UserDetailTemplate } from '../templates/UserDetailTemplate';
import { useFetcher } from '../utils/api';
import { useAuth } from '../utils/auth';

function UserDetailPageBase({ screenName }) {
  const { user } = useAuth();
  const userFetcher = useFetcher(`/v1/user/${screenName}`);

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

  return (
    <UserDetailTemplate
      userFetcher={userFetcher}
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
