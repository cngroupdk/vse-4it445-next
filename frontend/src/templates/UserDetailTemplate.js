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
} from '../atoms/';
import { QuackForm } from '../molecules/';
import { QuackList } from '../organisms/QuackList';
import { TopNavigation } from '../organisms/TopNavigation';

export function UserDetailTemplate({
  screenName,
  userFetcher,
  onLikePress,
  quackFormState,
  currentUser,
}) {
  const { data, isLoading, error, refetch } = userFetcher;
  const showQuackForm =
    quackFormState && currentUser && currentUser.screenName === screenName;

  return (
    <>
      <TopNavigation />
      <MainSection>
        {isLoading && !data && <Loading />}

        {error && (
          <ErrorBanner title={error.message}>
            <Button color="red" onClick={() => refetch()}>
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

            <TransparentButton className="fr" onClick={() => refetch()}>
              <FontAwesomeIcon icon={faSyncAlt} spin={isLoading} /> Refresh
            </TransparentButton>

            <QuackList quacks={data.user.quacks} onLikePress={onLikePress} />
          </>
        )}
      </MainSection>
    </>
  );
}
