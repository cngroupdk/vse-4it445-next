import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import {
  AvatarPhoto,
  ErrorMessage,
  Loading,
  TransparentButton,
} from '../atoms/';
import { QuackForm } from '../molecules/';
import { QuackList } from '../organisms/QuackList';
import { TopNavigation } from '../organisms/TopNavigation';

export function UserDetailTemplate({
  userFetcher,
  onLikePress,
  quackFormState,
}) {
  const { data, isLoading, error, refetch } = userFetcher;

  return (
    <>
      <TopNavigation />
      <div className="pa3 bt b--black-10">
        <section className="mw6 center">
          {isLoading && !data && <Loading />}
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {data && (
            <>
              <header>
                <AvatarPhoto
                  src={data.user.profileImageUrl}
                  alt={data.user.name}
                  size="4"
                />
                <h1 className="f3 mb2">{data.user.name}</h1>
                <h2 className="f5 fw4 gray mt0">@{data.user.screenName}</h2>
              </header>
              {quackFormState && <QuackForm {...quackFormState} />}
              <TransparentButton className="fr" onClick={() => refetch()}>
                <FontAwesomeIcon icon={faSyncAlt} spin={isLoading} /> Refresh
              </TransparentButton>
              <main>
                <QuackList
                  quacks={data.user.quacks}
                  onLikePress={onLikePress}
                />
              </main>
            </>
          )}
        </section>
      </div>
    </>
  );
}
