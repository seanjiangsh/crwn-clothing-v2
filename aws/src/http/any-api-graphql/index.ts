import { ApolloServer } from "apollo-server-lambda";

import { typeDefs } from "./categories.defs";
import { resolvers } from "./categories.resolvers";
import { Categories } from "./categories.data";

const rootValue = Categories;
const server = new ApolloServer({ rootValue, typeDefs, resolvers });
exports.handler = server.createHandler();
