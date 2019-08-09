import React from 'react';

import { UserDetailTemplate } from '../templates/UserDetailTemplate';
import { useFetcher } from '../utils/api';

function UserDetailPageBase({ screenName }) {
  const userFetcher = useFetcher(`/api/user/${screenName}`);

  const onLikePress = quack => {
    console.log('like:', quack);
  };

  return (
    <UserDetailTemplate userFetcher={userFetcher} onLikePress={onLikePress} />
  );
}

export function UserDetailPage({ match }) {
  const { screenName } = match.params;
  return <UserDetailPageBase key={screenName} screenName={screenName} />;
}
