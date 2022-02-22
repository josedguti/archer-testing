import { gql } from "apollo-server-micro";
import projectService from "./project";
import organizationService from "./organization";
import userService from "./user";
import requirementService from "./requirement";
import workItemService from "./workitem";
import contributorService from "./contributor";

const BaseSchema = gql`
  type Query {
    "Archer online"
    archer: Boolean
  }
  type Mutation {
    archer: Boolean
  }
`;

const BaseResolvers = {
  Query: {
    archer: () => true,
  },
  Mutation: {
    archer: () => true,
  },
};

const services = {
  schema: [
    BaseSchema,
    projectService.schema,
    organizationService.schema,
    userService.schema,
    requirementService.schema,
    workItemService.schema,
    contributorService.schema,
  ],
  resolvers: [
    BaseResolvers,
    projectService.resolvers,
    organizationService.resolvers,
    userService.resolvers,
    requirementService.resolvers,
    workItemService.resolvers,
    contributorService.resolvers,
  ],
};

export default services;
