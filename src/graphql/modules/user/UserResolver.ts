import { UserModule } from './__generated__/module-types';

export const UserResolver: UserModule.Resolvers['User'] = {
  name: () => {
    return 'DanKim';
  },
};
