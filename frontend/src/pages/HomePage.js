import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';

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
        userName
        profileImageUrl
      }
      text
    }
  }
`;

const QUACK_MUTATION = gql`
  mutation Quack($userId: Int!, $text: String!) {
    addQuack(userId: $userId, text: $text) {
      id
    }
  }
`;

export function HomePage() {
  const { user } = useAuth();
  const history = useHistory();

  const quacksState = useQuery(QUACKS_QUERY);

  const [quackMutationRequest, quackMutationRequestState] = useMutation(
    QUACK_MUTATION,
    {
      onCompleted: () => {
        history.go(0);
      },
    },
  );

  const [quackFormText, setQuackFormText] = useState('');
  const submitQuack = ({ text }) => {
    setQuackFormText('');
    quackMutationRequest({ variables: { text, userId: user.id } });
  };

  const quackFormState = {
    text: quackFormText,
    setText: setQuackFormText,
    onSubmit: submitQuack,
  };

  return (
    <HomeTemplate
      data={quacksState.data}
      error={quacksState.error || quackMutationRequestState.error}
      loading={quacksState.loading || quackMutationRequestState.loading}
      refetchQuacks={() => quacksState.refetch()}
      quackFormState={quackFormState}
      currentUser={user}
    />
  );
}
