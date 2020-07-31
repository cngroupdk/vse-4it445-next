import React from 'react';

import { AvatarPhoto, Link, UserName, UserScreenName } from '../atoms/';
import { formatDate } from '../utils/date';

export function Quack({ quack }) {
  const {
    id,
    user: { name, screenName, profileImageUrl },
    text,
    createdAt,
  } = quack;

  const linkToUser = `/${screenName}`;
  const linkToQuack = `/${screenName}/status/${id}`;

  return (
    <article className="flex w-100 bb b--black-10 pb2 mt2">
      <div className="w3">
        <Link to={linkToUser}>
          <AvatarPhoto src={profileImageUrl} alt={name} />
        </Link>
      </div>
      <div className="pl3 flex-auto">
        <div className="pb2">
          <Link to={linkToUser} className="black-90">
            <UserName name={name} /> <UserScreenName screenName={screenName} />
          </Link>
          {' - '}
          <Link to={linkToQuack} className="black-60">
            <span className="f6 fw4 black-60">{formatDate(createdAt)}</span>
          </Link>
        </div>
        <div className="black-90 pre-line">{text}</div>
      </div>
    </article>
  );
}
