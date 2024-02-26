import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloOptions = {
  uri: "https://crwn-clothing.com/",
  cache: new InMemoryCache(),
};

export const apolloClient = new ApolloClient(apolloOptions);
