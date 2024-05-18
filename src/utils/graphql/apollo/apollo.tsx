import { ApolloClient, InMemoryCache } from "@apollo/client";

const { DEV, VITE_NETLIFY_ENV } = import.meta.env;
// console.log({ DEV, VITE_NETLIFY_ENV });
const apolloOptions = {
  uri: VITE_NETLIFY_ENV
    ? "/.netlify/functions/graphql"
    : DEV
      ? "http://localhost:3000/api/graphql"
      : "/api/graphql",
  cache: new InMemoryCache(),
};

export const apolloClient = new ApolloClient(apolloOptions);
