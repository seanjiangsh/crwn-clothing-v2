import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloOptions = {
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
};

export const apolloClient = new ApolloClient(apolloOptions);
