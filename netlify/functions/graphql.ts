import type {
  HandlerEvent,
  HandlerCallback,
  HandlerContext,
} from "@netlify/functions";
import { ApolloServer } from "apollo-server-lambda";
import { Context } from "aws-lambda";

import { typeDefs } from "./graphql/categories.defs";
import { resolvers } from "./graphql/categories.resolvers";
import { Categories } from "./graphql/categories.data";

type HandlerEv = HandlerEvent & { requestContext?: any };

export const handler = (ev: HandlerEv, context: HandlerContext) => {
  if (!ev.requestContext) ev.requestContext = context;
  const rootValue = Categories;
  const server = new ApolloServer({ rootValue, typeDefs, resolvers });
  const callback: HandlerCallback = () => {};
  const graphqlHandler = server.createHandler();
  // Fix: Cast the context object to have the required properties of CognitoIdentity
  return graphqlHandler(ev, context as Context, callback);
};
