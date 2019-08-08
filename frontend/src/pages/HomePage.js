import React from 'react';

import { HomeTemplate } from '../templates/HomeTemplate';

export function HomePage() {
  const quacks = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
      text: 'Hello, People of the World!',
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Gatchell Young ',
        screenName: 'gyoung',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/2.jpg',
      },
      text: 'Como setas?',
    },
    {
      id: 3,
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
      text: 'Hello, World!',
    },
  ];

  const onLikePress = quack => {
    console.log('like:', quack);
  };

  return <HomeTemplate quacks={quacks} onLikePress={onLikePress} />;
}
