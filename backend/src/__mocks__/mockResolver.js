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
    signup: async (_, { email, password, name, userName }) => {
      await sleep(MOCK_DATA_DELAY);

      if (
        users.find(
          (user) =>
            user.userName.toLowerCase() === userName.trim().toLowerCase(),
        )
      ) {
        throw Error('This username is already taken!');
      }

      if (
        users.find(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
        )
      ) {
        throw Error('User with this email is already registered!');
      }

      const id = users.length + 1;
      const dbUser = {
        id,
        name: name.trim(),
        userName: userName.trim(),
        email: email.trim(),
        profileImageUrl: `https://eu.ui-avatars.com/api/?size=128&name=${encodeURIComponent(
          name.trim(),
        )}`,
        quacks: [],
      };

      const user = getAuthUser(dbUser);
      const token = createToken(user);

      users.push(dbUser);

      return { user, token };
    },
    addQuack: async (_, { userId, text }) => {
      await sleep(MOCK_DATA_DELAY);

      if (!(text || '').trim()) {
        throw Error('No text provided!');
      }

      const user = users.find((user) => user.id === userId);
      if (!user) {
        throw Error('User not found!');
      }

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
