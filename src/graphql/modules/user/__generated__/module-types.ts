/* eslint-disable */
import * as Types from "../../../__generated__/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: 'user';
    User: 'name';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    User?: UserResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      name?: gm.Middleware[];
    };
  };
}