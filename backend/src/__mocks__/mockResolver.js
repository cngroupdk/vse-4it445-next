import { createToken } from '../libs/token';
import { users, quacks } from './mocks';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_DATA_DELAY = 300;

export default {
  Query: {
    users: async () => {
      await sleep(MOCK_DATA_DELAY);

      return users
    },
    user: async (_, { username }) => {
      await sleep(MOCK_DATA_DELAY);

      return users.find((user) => user.username === username);
    },
    quacks: async () => {
      await sleep(MOCK_DATA_DELAY);

      return quacks;
    },
  },
  Mutation: {
    signin: async () => {
      await sleep(MOCK_DATA_DELAY);
      const user = users[0];
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
      const id = quacks[quacks.length - 1].id + 1;

      const quack = {
        id,
        createdAt: new Date().toISOString(),
        userId,
        text,
      };

      quacks.splice(0, 0, quack);

      return quack;
    },
  },
};
