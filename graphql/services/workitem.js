import { gql } from "apollo-server-core";

const workItemService = {
  schema: gql`
    type WorkItem {
      id: String
      name: String
      requirement: Requirement
      requirementId: String
      hoursEstimated: Float
      hoursSpent: Float
    }

    extend type Query {
      workItems: [WorkItem]
      workItemsByRequirement(requirementId: String!): [WorkItem]
    }

    extend type Mutation {
      createWorkItem(requirementId: String!, name: String!, hoursEstimated: Float, hoursSpent: Float): WorkItem
      updateWorkItem(Id: String!, name: String, hoursEstimated: Float, hoursSpent: Float): WorkItem
    }
  `,
  resolvers: {
    Query: {
      workItems: (_, args, ctx) => {
        return ctx.prisma.workItem.findMany({});
      },
      workItemsByRequirement: (_, { requirementId }, ctx) => {
        return ctx.prisma.workItem.findMany({
          where: {
            requirementId: requirementId,
          },
        });
      },
    },
    Mutation: {
      createWorkItem: (_, args, ctx) => {
        return ctx.prisma.workItem.create({
          data: {
            name: args.name,
            hoursEstimated: args.hoursEstimated,
            hoursSpent: args.hoursSpent,
            requirement: {
              connect: { id: args.requirementId },
            },
          },
        });
      },
      updateWorkItem: (_, args, ctx) => {
        return ctx.prisma.workItem.update({
          where: { id: args.Id },
          data: {
            name: args.name,
            hoursEstimated: args.hoursEstimated,
            hoursSpent: args.hoursSpent,
          },
        });
      },
    },
  },
};

export default workItemService;
