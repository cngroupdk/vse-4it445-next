import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserDetailTemplate } from 'src/templates/UserDetailTemplate';
import { PageNotFound } from './PageNotFound';
import { useAuth } from 'src/utils/auth';

const USER_DETAIL_QUERY = gql`
  query UserDetail($userName: String!) {
    user(userName: $userName) {
      id
      name
      userName
      profileImageUrl
      quacks {
        id
        createdAt
        text
        user {
          id
          name
          userName
          profileImageUrl
        }
      }
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

export function UserDetailPage() {
  const { user } = useAuth();
  const history = useHistory();
  const { userName } = useParams();

  const userFetcher = useQuery(USER_DETAIL_QUERY, {
    variables: { userName },
  });

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

  if (userFetcher.data && userFetcher.data.user === null) {
    return <PageNotFound />;
  }

  return (
    <UserDetailTemplate
      data={userFetcher.data}
      loading={userFetcher.loading || quackMutationRequestState.loading}
      error={userFetcher.error || quackMutationRequestState.error}
      onReload={() => userFetcher.refetch()}
      quackFormState={quackFormState}
      currentUser={user}
      userName={userName}
    />
  );
}
