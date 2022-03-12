import { Resolvers } from '../__generated__/graphql';
import { UserQuery, UserResolver } from './user';

export const resolvers: Resolvers = {
  Query: {
    ...UserQuery,
  },

  /** */
  User: UserResolver,
};
