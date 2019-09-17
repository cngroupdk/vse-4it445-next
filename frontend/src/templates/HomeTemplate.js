import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { TransparentButton } from '../atoms/';
import { QuackForm } from '../molecules/';
import { QuackList } from '../organisms/QuackList';
import { TopNavigation } from '../organisms/TopNavigation';

export function HomeTemplate({
  quacksFetcher,
  onLikePress,
  quackFormState,
  currentUser,
}) {
  return (
    <>
      <TopNavigation />
      <div className="pa3 bt b--black-10">
        <section className="mw6 center">
          <header>
            <h1>Home</h1>
          </header>
          {currentUser && <QuackForm {...quackFormState} />}

          {quacksFetcher.data && (
            <TransparentButton
              className="fr"
              onClick={() => quacksFetcher.refetch()}
            >
              <FontAwesomeIcon
                icon={faSyncAlt}
                spin={quacksFetcher.isLoading}
              />{' '}
              Refresh
            </TransparentButton>
          )}
          <main>
            <QuackList
              quacks={quacksFetcher.data && quacksFetcher.data.quacks}
              isLoading={quacksFetcher.isLoading}
              error={quacksFetcher.error}
              onLikePress={onLikePress}
              refetch={() =>
                quacksFetcher.refetch({ params: { limit: 20, page: 1 } })
              }
            />
          </main>
        </section>
      </div>
    </>
  );
}
