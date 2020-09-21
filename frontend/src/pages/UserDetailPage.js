import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserDetailTemplate } from 'src/templates/UserDetailTemplate';
import { PageNotFound } from './PageNotFound';
import { useAuth } from 'src/utils/auth';

const USER_DETAIL_QUERY = gql`
  query UserDetail($username: String!) {
    user(username: $username) {
      id
      name
      username
      profileImageUrl
      quacks {
        id
        createdAt
        text
        user {
          id
          name
          username
          profileImageUrl
        }
      }
    }
  }
`;

const QUACK_MUTATION = gql`
  mutation Quack($userId: Int!, $text: String!) {
    addQuack(userId: $userId, text: $text)
  }
`;

export function UserDetailPage() {
  const { user } = useAuth();
  const { username } = useParams();
  const history = useHistory();

  const userFetcher = useQuery(USER_DETAIL_QUERY, {
    variables: { username },
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
      username={username}
    />
  );
}
