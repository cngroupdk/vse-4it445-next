import React, { useState } from 'react';

import { HomeTemplate } from '../templates/HomeTemplate';
import { useFetcher } from '../utils/api';
import { useAuth } from '../utils/auth';

export function HomePage() {
  const { user } = useAuth();
  const quacksFetcher = useFetcher('/api/timeline');

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
