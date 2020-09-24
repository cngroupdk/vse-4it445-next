import { createToken } from '../libs/token';
import { users, quacks } from './mocks';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_DATA_DELAY = 300;

function getAuthUser(dbUser) {
  return {
    id: dbUser.id,
    name: dbUser.name,
    userName: dbUser.userName,
    profileImageUrl: dbUser.profileImageUrl,
  };
}

export default {
  Query: {
    users: async () => {
      await sleep(MOCK_DATA_DELAY);

      return users;
    },
    user: async (_, { userName }) => {
      await sleep(MOCK_DATA_DELAY);

      return users.find((user) => user.userName === userName);
    },
    quacks: async () => {
      await sleep(MOCK_DATA_DELAY);

      return quacks;
    },
  },
  Mutation: {
    signin: async () => {
      await sleep(MOCK_DATA_DELAY);
      const user = getAuthUser(users[0]);
      const token = createToken(user);

      return {
        user,
        token,
      };
    },
    signup: async (_, { email }) => {
      await sleep(MOCK_DATA_DELAY);

      return { email };
    },
    addQuack: async (_, { userId, text }) => {
      await sleep(MOCK_DATA_DELAY);

      if (!(text || '').trim()) {
        throw Error('No text provided!');
      }

      const user = users.find((user) => user.id === userId);
      const quack = {
        id: quacks.length + 1,
        createdAt: new Date().toISOString(),
        user,
        userId,
        text,
      };

      quacks.splice(0, 0, quack);
      if (user) {
        user.quacks.splice(0, 0, quack);
      }

      return quack;
    },
  },
};
