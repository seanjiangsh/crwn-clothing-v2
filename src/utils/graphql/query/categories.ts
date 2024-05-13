import { gql } from "../types";

export const getCategories = gql(/* GraphQL */ `
  query GetCategories {
    categories {
      id
      title
      items {
        id
        name
        price
      }
    }
  }
`);

export const getCategoryById = gql(/* GraphQL */ `
  query GetCategoryById($id: ID!) {
    getCategoryById(id: $id) {
      id
      title
      items {
        id
        name
        price
      }
    }
  }
`);

export const getCategoryByTitle = gql(/* GraphQL */ `
  query GetCategoryByTitle($title: String!) {
    getCategoryByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
      }
    }
  }
`);
