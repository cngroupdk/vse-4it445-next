import React, { useState } from 'react';

import { HomeTemplate } from '../templates/HomeTemplate';
import { useFetchRequest } from '../utils/request';
import { useAuth } from '../utils/auth';

export function HomePage() {
  const { user } = useAuth();
  const quacksFetcher = useFetchRequest('/v1/timeline', {
    params: { limit: 20 },
  });

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
    <HomeTemplate
      quacksFetcher={quacksFetcher}
      onLikePress={onLikePress}
      quackFormState={quackFormState}
      currentUser={user}
    />
  );
}
