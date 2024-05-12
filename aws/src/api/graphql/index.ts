import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./categories.defs";
import { resolvers } from "./categories.resolvers";
import { Categories } from "./categories.data";

// Apply Apollo middleware to Express
const rootValue = Categories;
const server = new ApolloServer({ rootValue, typeDefs, resolvers });
server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export default expressMiddleware(server);
