import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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

export function UserDetailPage() {
  const { user } = useAuth();
  const { username } = useParams();
  const userFetcher = useQuery(USER_DETAIL_QUERY, {
    variables: { username },
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

  if (userFetcher.data && userFetcher.data.user === null) {
    return <PageNotFound />;
  }

  return (
    <UserDetailTemplate
      userFetcher={userFetcher}
      onReload={() => userFetcher.refetch()}
      quackFormState={quackFormState}
      currentUser={user}
      username={username}
    />
  );
}
