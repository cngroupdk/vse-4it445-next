import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { HomeTemplate } from 'src/templates/HomeTemplate';
import { useAuth } from 'src/utils/auth';

const QUACKS_QUERY = gql`
  query Quacks {
    quacks {
      id
      createdAt
      user {
        id
        name
        screenName
        profileImageUrl
      }
      text
    }
  }
`;

export function HomePage() {
  const { user } = useAuth();
  const quacksState = useQuery(QUACKS_QUERY);

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
      refetchQuacks={() => quacksState.refetch()}
      quackFormState={quackFormState}
      currentUser={user}
    />
  );
}
