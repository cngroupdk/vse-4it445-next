import React from 'react';

import { ErrorMessage, Loading } from '../atoms/';
import { Quack } from '../molecules/';

export function QuackList({ quacks, isLoading, error, onLikePress }) {
  return (
    <>
      {isLoading && !quacks && <Loading />}
      {error && <ErrorMessage>{error.message || 'Unknown error'}</ErrorMessage>}
      {quacks &&
        quacks.map(quack => (
          <Quack key={quack.id} quack={quack} onLikePress={onLikePress} />
        ))}
    </>
  );
}
