import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { Heading, MainSection, TransparentButton } from '../atoms/';
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
      <MainSection>
        <Heading>Home</Heading>

        {currentUser && <QuackForm {...quackFormState} />}

        {quacksFetcher.data && (
          <TransparentButton
            className="fr"
            onClick={() => quacksFetcher.refetch()}
          >
            <FontAwesomeIcon icon={faSyncAlt} spin={quacksFetcher.isLoading} />{' '}
            Refresh
          </TransparentButton>
        )}

        <QuackList
          quacks={quacksFetcher.data && quacksFetcher.data.quacks}
          isLoading={quacksFetcher.isLoading}
          error={quacksFetcher.error}
          onLikePress={onLikePress}
          refetch={() =>
            quacksFetcher.refetch({ params: { limit: 20, page: 1 } })
          }
        />
      </MainSection>
    </>
  );
}
