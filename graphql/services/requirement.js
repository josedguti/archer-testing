import { gql } from "apollo-server-core";
import _ from "lodash";

const requirementService = {
  schema: gql`
    type Requirement {
      id: String
      name: String
      description: String
      project: Project
      projectId: String
      workItems: [WorkItem]
      stage: String
      priority: String
      totalHoursEstimated: Float
      totalHoursSpent: Float
      totalHoursRemaining: Float
      createdAt: String
      updatedAt: String
    }
    type ApproveRequirementPayload {
      priority: Boolean
      message: String
    }
    input RequirementFilter {
      stage: String
      priority: String
    }
    extend type Query {
      requirementsByProject(
        filter: RequirementFilter
        projectId: String!
      ): [Requirement]
    }

    extend type Mutation {
      createRequirement(
        name: String
        description: String
        projectId: String
        priority: String
      ): Requirement
      approveRequirement(requirementId: String): ApproveRequirementPayload
      updateRequirement(
        id: String
        name: String
        description: String
        stage: String
        priority: String
      ): Requirement
    }
  `,
  resolvers: {
    Query: {
      requirementsByProject: (_, { filter, projectId }, ctx) => {
        return ctx.prisma.requirement.findMany({
          where: {
            projectId: projectId,
            stage: filter?.stage,
            priority: filter?.priority,
          },
        });
      },
    },
    Mutation: {
      createRequirement: (parent, args, ctx) => {
        return ctx.prisma.requirement.create({
          data: {
            name: args.name,
            description: args.description,
            stage: "makingestimate",
            priority: args.priority,
            project: {
              connect: { id: args.projectId },
            },
          },
        });
      },
      updateRequirement: (parent, args, ctx) => {
        return ctx.prisma.requirement.update({
          where: { id: args.id },
          data: {
            name: args.name,
            description: args.description,
            stage: args.stage,
            priority: args.priority,
          },
        });
      },
      approveRequirement: async (parent, args, ctx) => {
        const requirement = await ctx.prisma.requirement.findUnique({
          where: { id: args.requirementId },
          include: {
            workItems: {
              select: {
                hoursEstimated: true,
              },
            },
          },
        });
        console.log(JSON.stringify(requirement));
        if (_.isEmpty(requirement))
          return {
            priority: false,
            message: `Requirement '${args.requirementId}' not found`,
          };

        if (requirement.stage !== "waitingapproval")
          return {
            priority: false,
            message: `Requirement stage should be in 'waitingapproval'`,
          };

        if (!requirement.workItems.length)
          return {
            priority: false,
            message: `Requirement should have one or more work items`,
          };

        // Check if any work items doesn't have hours estimated
        const workItemNotEstimated = _.find(requirement.workItems, (workItem) =>
          _.isNull(workItem.hoursEstimated)
        );
        console.log(workItemNotEstimated);
        if (!_.isEmpty(workItemNotEstimated))
          return {
            priority: false,
            message: `All work items should have an estimated hours`,
          };

        // Update requirement stage to 'ondeck'
        await ctx.prisma.requirement.update({
          where: { id: args.requirementId },
          data: {
            stage: "ondeck",
          },
        });

        return {
          priority: true,
          message: "Requirement approved",
        };
      },
    },
    Requirement: {
      workItems: (parent, args, ctx) => {
        return ctx.prisma.workItem.findMany({
          where: {
            requirementId: parent.id,
          },
        });
      },
      totalHoursEstimated: async (parent, args, ctx) => {
        const workItems = await ctx.prisma.workItem.findMany({
          where: {
            requirementId: parent.id,
          },
        });

        const totalEst = workItems.reduce(function (sum, current) {
          return sum + current.hoursEstimated;
        }, 0);
        return totalEst;
      },
      totalHoursSpent: async (parent, args, ctx) => {
        const workItems = await ctx.prisma.workItem.findMany({
          where: {
            requirementId: parent.id,
          },
        });

        const totalSpent = workItems.reduce(function (sum, current) {
          return sum + current.hoursSpent;
        }, 0);
        return totalSpent;
      },
      totalHoursRemaining: async (parent, args, ctx) => {
        const workItems = await ctx.prisma.workItem.findMany({
          where: {
            requirementId: parent.id,
          },
        });

        const totalRemaining = workItems.reduce(function (sum, current) {
          return sum + current.hoursEstimated - current.hoursSpent;
        }, 0);
        return totalRemaining;
      },
    },
  },
};

export default requirementService;

// Requirement

// 1. Open -> not `complete`
// 2. Approved -> items on `In progress` or `On deck`

// 1. Making Est
// 2. Waiting Approval
// 3. On Deck
// 4. In progress
// 5. Completed
