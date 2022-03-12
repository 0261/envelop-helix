import { UserModule } from './__generated__/module-types';

export const UserQuery: UserModule.Resolvers['Query'] = {
  user: (_, parent, context) => {
    return {
      name: '1',
    };
  },
};
