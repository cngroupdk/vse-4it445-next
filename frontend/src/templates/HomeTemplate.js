import React from 'react';

import { Heading, MainSection } from 'src/atoms/';
import { QuackForm, ReloadButton } from 'src/molecules/';
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
          <ReloadButton
            isLoading={quacksState.loading}
            onClick={() => refetchQuacks()}
            className="fr"
          />
        )}

        <QuackList
          quacks={quacksState.data && quacksState.data.quacks}
          isLoading={quacksState.loading}
          error={quacksState.error}
          refetch={refetchQuacks}
        />
      </MainSection>
    </>
  );
}
