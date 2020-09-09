import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { createToken } from './libs/token';

import { quacks, users } from './__mocks__/mocks';

dotenv.config();

// TODO - just a mock before db implementation
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const typeDefs = gql`
  type User {
    id: Int
    name: String
    screenName: String
    profileImageUrl: String
    quacks: [Quack!]!
  }

  type Quack {
    id: Int
    createdAt: String
    user: User!
    text: String
  }

  type SignIn {
    user: User!
    token: String!
  }

  type SignUp {
    email: String!
  }

  type Query {
    users: [User!]!
    user(screenName: String!): User
    quacks: [Quack!]!
  }

  type Mutation {
    signin(email: String!, password: String!): SignIn!
    signup(
      email: String!
      password: String!
      passwordConfirmation: String!
    ): SignUp!
  }
`;

// TODO - just a mock before db implementation

const MOCK_DATA_DELAY = 300;

const resolvers = {
  Query: {
    users: async () => {
      await sleep(MOCK_DATA_DELAY);

      return users;
    },
    user: async (_, { screenName }) => {
      await sleep(MOCK_DATA_DELAY);

      const foundUser = users.find((user) => user.screenName === screenName);

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

      return quacks.map((quack) => ({
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
  },
};

const app = express();

app.disable('x-powered-by');
app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  playground: true,
});

apolloServer.applyMiddleware({ app, cors: false });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.info(`Server started at http://localhost:${port}/graphql`);
});
