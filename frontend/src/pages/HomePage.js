import React, { useState } from 'react';

import { HomeTemplate } from '../templates/HomeTemplate';
import { useFetchRequest } from '../hooks';
import { useAuth } from '../utils/auth';

export function HomePage() {
  const { user } = useAuth();

  const [quacksState, requestQuacks] = useFetchRequest({
    url: '/v1/timeline',
    params: { limit: 20 },
  });

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
      quacksState={quacksState}
      refetchQuacks={() => requestQuacks({ params: { page: 1 } })}
      quackFormState={quackFormState}
      currentUser={user}
    />
  );
}
