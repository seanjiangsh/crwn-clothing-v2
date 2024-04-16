import { ApolloClient, InMemoryCache } from "@apollo/client";

const { DEV, VITE_PUBLISHED_GRAPHQL_ENDPOINT } = import.meta.env;
const apolloOptions = {
  uri: DEV ? "http://localhost:3000/graphql" : VITE_PUBLISHED_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
};

export const apolloClient = new ApolloClient(apolloOptions);
