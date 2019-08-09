import React, { useState } from 'react';

import { HomeTemplate } from '../templates/HomeTemplate';

export function HomePage() {
  const quacks = [
    {
      id: 1,
      createdAt: '2019-08-08T14:13:18.023Z',
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
      text: 'Hello, People of the World!',
      likeCount: 399,
      liked: true,
    },
    {
      id: 2,
      createdAt: '2019-08-06T14:13:18.023Z',
      user: {
        id: 2,
        name: 'Gatchell Young ',
        screenName: 'gyoung',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/2.jpg',
      },
      text: 'Como setas?',
      likeCount: 2,
      liked: false,
    },
    {
      id: 3,
      createdAt: '2019-08-03T14:13:18.023Z',
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
      text: 'Hello,\n\nWorld!',
      likeCount: 0,
      liked: false,
    },
  ];

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
      quacks={quacks}
      onLikePress={onLikePress}
      quackFormState={quackFormState}
    />
  );
}
