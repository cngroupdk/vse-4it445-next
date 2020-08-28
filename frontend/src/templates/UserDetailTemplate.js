import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import {
  AvatarPhoto,
  Button,
  ErrorBanner,
  Heading,
  Loading,
  MainSection,
  TransparentButton,
} from 'src/atoms/';
import { QuackForm } from 'src/molecules/';
import { QuackList, TopNavigation } from 'src/organisms/';

export function UserDetailTemplate({
  screenName,
  userFetcher,
  onReload,
  quackFormState,
  currentUser,
}) {
  const { data, isLoading, error } = userFetcher;
  const showQuackForm =
    quackFormState && currentUser && currentUser.screenName === screenName;

  return (
    <>
      <TopNavigation />
      <MainSection>
        {isLoading && !data && <Loading />}

        {error && (
          <ErrorBanner title={error.message}>
            <Button color="red" onClick={onReload}>
              Reload
            </Button>
          </ErrorBanner>
        )}

        {data && (
          <>
            <header>
              <AvatarPhoto
                src={data.user.profileImageUrl}
                alt={data.user.name}
                size="4"
                className="mb2"
              />
              <Heading size="lg">{data.user.name}</Heading>
              <Heading size="sm" className="fw4 gray">
                @{data.user.screenName}
              </Heading>
            </header>

            {showQuackForm && <QuackForm {...quackFormState} />}

            <TransparentButton className="fr" onClick={onReload}>
              <FontAwesomeIcon icon={faSyncAlt} spin={isLoading} /> Reload
            </TransparentButton>

            <QuackList quacks={data.user.quacks} />
          </>
        )}
      </MainSection>
    </>
  );
}
