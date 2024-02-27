import type { HandlerEvent, HandlerCallback } from "@netlify/functions";
import { ApolloServer } from "apollo-server-lambda";

import { typeDefs } from "./graphql/categories.defs";
import { resolvers } from "./graphql/categories.resolvers";
import { Categories } from "./graphql/categories.data";

type HandlerEv = HandlerEvent & { requestContext?: any };

export const handler = (ev: HandlerEv, context: any) => {
  if (!ev.requestContext) ev.requestContext = context;
  const rootValue = Categories;
  const server = new ApolloServer({ rootValue, typeDefs, resolvers });
  const callback: HandlerCallback = () => {};
  const graphqlHandler = server.createHandler();
  return graphqlHandler(ev, context, callback);
};
