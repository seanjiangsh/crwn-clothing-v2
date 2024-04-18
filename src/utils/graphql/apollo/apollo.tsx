import { ApolloClient, InMemoryCache } from "@apollo/client";

const { DEV, VITE_NETLIFY_ENV } = import.meta.env;
const apolloOptions = {
  uri: DEV
    ? "http://localhost:3000/graphql"
    : VITE_NETLIFY_ENV
      ? "/.netlify/functions/graphql"
      : "/api/graphql",
  cache: new InMemoryCache(),
};

export const apolloClient = new ApolloClient(apolloOptions);
