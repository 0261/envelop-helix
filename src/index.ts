import './environment';

import fastify from 'fastify';
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix';
import { envelop, useSchema, useExtendContext } from '@envelop/core';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers } from './graphql/modules/resolvers';
import { typeDefs } from './graphql/__generated__/typeDefs';
import { Context } from './graphql/context';
import { STAGE } from './constant';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const getEnveloped = envelop({
  plugins: [useSchema(schema), useExtendContext((): Context => {
    return {
      custom: {
        hello: () => 'World',
      },
    };
  })],
});

const app = fastify();

app.route({
  method: ['GET', 'POST'],
  url: '/graphql',
  async handler(req, res) {
    const { parse, validate, execute, schema, contextFactory } = getEnveloped({
      req,
    });
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };

    if (shouldRenderGraphiQL(request)) {
      void res.type('text/html');
      void res.send(renderGraphiQL({}));
    }
    else {
      const { operationName, query, variables } = getGraphQLParameters(request);
      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        parse,
        validate,
        execute,
        contextFactory,
      });

      void sendResult(result, res.raw);

      res.sent = true;
    }
  },
});

if (environment.string('STAGE') === STAGE.Production) {
  app.listen(3000, () => {
    console.log('GraphQL server is running.');
  });
}

/** vite hmr */
export const viteNodeApp = app;
