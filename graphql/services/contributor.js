import { gql } from "apollo-server-core";

const contributorService = {
  schema: gql`
    type Contributor {
      id: String
      name: String
      image: String
    }
  `,
  resolvers: {
    Query: {},
  },
};

export default contributorService;
