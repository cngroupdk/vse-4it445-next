import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { Heading, MainSection, TransparentButton } from '../atoms/';
import { QuackForm } from '../molecules/';
import { QuackList, TopNavigation } from '../organisms/';

export function HomeTemplate({
  quacksState,
  refetchQuacks,
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

        {quacksState.data && (
          <TransparentButton className="fr" onClick={() => refetchQuacks()}>
            <FontAwesomeIcon icon={faSyncAlt} spin={quacksState.isLoading} />{' '}
            Refresh
          </TransparentButton>
        )}

        <QuackList
          quacks={quacksState.data && quacksState.data.quacks}
          isLoading={quacksState.isLoading}
          error={quacksState.error}
          onLikePress={onLikePress}
          refetch={refetchQuacks}
        />
      </MainSection>
    </>
  );
}
