import {
  queries as QuackQueries
} from './quack';
import {
  queries as UserQueries,
  mutations as UserMutations,
} from './user';

export default {
  Query: {
    ...QuackQueries,
    ...UserQueries,
  },
  Mutation: {
    ...UserMutations,
  },
  User: {
    async quacks(parent, _, { dbConnection }) {
      return await dbConnection.query(`SELECT * FROM quack WHERE userId = ?`, [
        parent.id,
      ]);
    },
  },
  Quack: {
    async user(parent, _, { dbConnection }) {
      return (
        await dbConnection.query(`SELECT * FROM user WHERE id = ?`, [
          parent.userId,
        ])
      )[0];
    },
  },
};
