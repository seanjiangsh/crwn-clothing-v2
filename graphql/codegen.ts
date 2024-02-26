import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://crwn-clothing.com/",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/utils/graphql/": {
      preset: "client",
      plugins: [],
      presetConfig: { gqlTagName: "gql" },
    },
  },
  ignoreNoDocuments: true,
  overwrite: true,
};

export default config;
