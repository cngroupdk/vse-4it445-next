import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import {
  AvatarPhoto,
  UserName,
  UserScreenName,
  Link,
  TransparentButton,
} from '../atoms/';

export function Quack({ quack, onLikePress }) {
  const {
    user: { name, screenName, profileImageUrl },
    text,
  } = quack;

  return (
    <article className="flex w-100 bb b--black-10 pb2 mt2">
      <div className="w3">
        <Link href="#0">
          <AvatarPhoto src={profileImageUrl} alt="#0" />
        </Link>
      </div>
      <div className="pl3">
        <div className="pb2">
          <Link href="#0" className="black-90">
            <UserName name={name} /> <UserScreenName screenName={screenName} />
          </Link>
          {' - '}
          <Link href="#0" className="black-60">
            <span className="f6 fw4 black-60">May 13</span>
          </Link>
        </div>
        <div className="black-90">{text}</div>
        <div className="pt2">
          <TransparentButton
            className="f6 black-60 mr2"
            onClick={() => {
              if (!onLikePress) return;
              onLikePress(quack);
            }}
          >
            <FontAwesomeIcon icon={faHeart} /> Like
          </TransparentButton>
        </div>
      </div>
    </article>
  );
}
