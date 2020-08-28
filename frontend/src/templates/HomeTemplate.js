import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { Heading, MainSection, TransparentButton } from 'src/atoms/';
import { QuackForm } from 'src/molecules/';
import { QuackList, TopNavigation } from 'src/organisms/';

export function HomeTemplate({
  quacksState,
  refetchQuacks,
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
          refetch={refetchQuacks}
        />
      </MainSection>
    </>
  );
}
