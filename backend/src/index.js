import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';

import rootResolver from './modules/rootResolver';
import mockResolver from './__mocks__/mockResolver';

dotenv.config();

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String!
    username: String!
    profileImageUrl: String
    quacks: [Quack!]!
  }

  type Quack {
    id: Int!
    createdAt: String!
    user: User!
    userId: Int!
    text: String!
  }

  type SignIn {
    user: User!
    token: String!
  }

  type SignUp {
    user: User!
    token: String!
  }

  type Query {
    users: [User!]!
    user(username: String!): User
    quacks: [Quack!]!
  }

  type Mutation {
    signin(email: String!, password: String!): SignIn!
    signup(
      email: String!
      password: String!
      passwordConfirmation: String
      name: String!
      username: String!
      profileImageUrl: String
    ): SignUp!
    addQuack(userId: Int!, text: String!): Quack!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());
  const dbConnection = await getConnection();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: process.env.MOCKS === 'true' ? mockResolver : rootResolver,
    context: async ({ req, res }) => {
      const auth = req.headers.Authorization || '';

      return {
        req,
        res,
        dbConnection,
        auth,
      };
    },
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
