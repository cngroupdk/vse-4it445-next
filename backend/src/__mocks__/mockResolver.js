import { createToken } from '../libs/token';
import { users, quacks } from './mocks';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_DATA_DELAY = 300;
let localQuacks = quacks;

export default {
  Query: {
    users: async () => {
      await sleep(MOCK_DATA_DELAY);

      return users;
    },
    user: async (_, { username }) => {
      await sleep(MOCK_DATA_DELAY);

      const foundUser = users.find((user) => user.username === username);

      if (!foundUser) {
        return null;
      }

      return {
        ...foundUser,
        quacks: quacks
          .filter((quack) => quack.userId === foundUser.id)
          .map((quack) => ({
            ...quack,
            user: foundUser,
          })),
      };
    },
    quacks: async () => {
      await sleep(MOCK_DATA_DELAY);
      return localQuacks.map((quack) => ({
        ...quack,
        user: users.find((user) => quack.userId === user.id),
      }));
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

      return {
        email,
      };
    },
    addQuack: async (_, { userId, text }) => {
      const id = quacks[quacks.length - 1].id + 1;

      const quack = {
        id,
        createdAt: new Date().toISOString(),
        userId,
        text,
      };

      localQuacks.push(quack);

      return quack;
    },
  },
};
