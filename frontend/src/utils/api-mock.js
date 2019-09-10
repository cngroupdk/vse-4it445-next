import MockAdapter from 'axios-mock-adapter';
import { mocks } from './mocks';

const MOCK_API_DELAY = 500;

export function installApiMocks(api) {
  const mock = new MockAdapter(api, { delayResponse: MOCK_API_DELAY });

  // HomePage
  mock.onGet('/api/v1/timeline').reply(200, {
    quacks: getMockQuacks(mocks),
  });

  // UserDetailPage
  mocks.users.forEach(({ screenName }) => {
    mock.onGet(`/api/v1/user/${screenName}`).reply(200, {
      user: getMockUserDetailPage(mocks, screenName),
    });
  });

  // all other
  mock.onAny().passThrough();
}

// - helper functions - //

function getMockQuacks(currentMocks) {
  const { quacks, users } = currentMocks;
  return quacks.map(quack => ({
    ...quack,
    userId: undefined,
    user: users.find(({ id }) => id === quack.userId),
  }));
}

function getMockUserDetailPage(currentMocks, screenName) {
  const { quacks } = currentMocks;

  const user = getMockUser(currentMocks, screenName);
  if (!user) return null;

  return {
    ...user,
    quacks: quacks
      .filter(({ userId }) => userId === user.id)
      .map(quack => ({
        ...quack,
        userId: undefined,
        user,
      })),
  };
}

function getMockUser(currentMocks, screenName) {
  const { users } = currentMocks;

  const user = users.find(user => screenName === user.screenName);
  if (!user) return null;

  return user;
}
