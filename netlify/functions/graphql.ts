import type { HandlerEvent, HandlerCallback } from "@netlify/functions";
import { ApolloServer, gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return `Hello from Netlify function.`;
    },
  },
};

type HandlerEv = HandlerEvent & { requestContext?: any };

export const handler = (ev: HandlerEv, context: any) => {
  if (!ev.requestContext) ev.requestContext = context;

  const server = new ApolloServer({ typeDefs, resolvers });
  const callback: HandlerCallback = (args) => {
    // console.log({ args });
  };
  const graphqlHandler = server.createHandler();
  return graphqlHandler(ev, context, callback);
};
