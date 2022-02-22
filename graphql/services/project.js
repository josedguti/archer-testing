import { gql } from "apollo-server-core";

const projectService = {
  schema: gql`
    type Project {
      id: ID!
      name: String!
      description: String!
      requirements: [Requirement]
      organization: Organization!
      organizationId: String!
      users: [User]
      contributors: [Contributor]
      totalHoursEstimated: Float
      totalHoursSpent: Float
      totalHoursRemaining: Float
      estimatedCompletionDate: String
      projectVelocity: Float
      hourlyEfficiency: Float
      openRequirements: [Requirement]
      awaitingApprovals: [Requirement]
      createdAt: String
      updatedAt: String
    }
    extend type Query {
      projects: [Project]
      project(id: String!): Project
      projectsByUser: [Project]
    }
    extend type Mutation {
      createProject(name: String!, description: String!, username: String!): Project
    }
  `,
  resolvers: {
    Query: {
      projects: async (_, args, ctx) => {
        return ctx.prisma.project.findMany({});
      },
      project: async (_, { id }, ctx) => {
        return ctx.prisma.project.findUnique({
          where: {
            id: id,
          },
        });
      },
      projectsByUser: async (parent, args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            username: ctx.session.user.username,
          },
        });

        return ctx.prisma.project.findMany({
          where: {
            users: {
              some: {
                userId: user.id,
              },
            },
          },
        });
      },
    },
    Mutation: {
      createProject: async (parent, args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            username: ctx.session.user.username,
          },
        });

        return ctx.prisma.project.create({
          data: {
            name: args.name,
            description: args.description,
            users: {
              create: [{ user: { connect: { id: user.id } } }],
            },
          },
        });
      },
    },
    Project: {
      users: (parent, args, ctx) => {
        return ctx.prisma.user.findMany({
          where: {
            projects: {
              some: {
                projectId: parent.id,
              },
            },
          },
        });
      },
      requirements: (parent, args, ctx) => {
        return ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
          },
        });
      },
      contributors: (parent, args, ctx) => {
        return ctx.prisma.contributor.findMany({
          where: {
            projects: {
              some: {
                projectId: parent.id,
              },
            },
          },
        });
      },
      totalHoursEstimated: async (parent, args, ctx) => {
        const requirements = await ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
          },
          select: {
            workItems: {
              select: {
                hoursSpent: true,
                hoursEstimated: true,
              },
            },
          },
        });

        const requirementsEst = requirements.map((req) => {
          return req.workItems.reduce(function (sum, current) {
            return sum + current.hoursEstimated;
          }, 0);
        });

        const projectEst = requirementsEst.reduce(function (sum, current) {
          return sum + current;
        }, 0);

        return projectEst;
      },
      totalHoursSpent: async (parent, args, ctx) => {
        const requirements = await ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
          },
          select: {
            workItems: {
              select: {
                hoursSpent: true,
                hoursEstimated: true,
              },
            },
          },
        });

        const requirementsSpent = requirements.map((req) => {
          return req.workItems.reduce(function (sum, current) {
            return sum + current.hoursSpent;
          }, 0);
        });

        const projectSpent = requirementsSpent.reduce(function (sum, current) {
          return sum + current;
        }, 0);

        return projectSpent;
      },
      totalHoursRemaining: async (parent, args, ctx) => {
        const requirements = await ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
          },
          select: {
            workItems: {
              select: {
                name: true,
                hoursSpent: true,
                hoursEstimated: true,
              },
            },
          },
        });

        const requirementsRemaining = requirements.map((req) => {
          return req.workItems.reduce(function (sum, current) {
            return sum + current.hoursEstimated - current.hoursSpent;
          }, 0);
        });

        const projectRemaining = requirementsRemaining.reduce(function (sum, current) {
          return sum + current;
        }, 0);

        return projectRemaining;
      },
      estimatedCompletionDate: async (parent, args, ctx) => {
        const requirements = await ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
          },
          select: {
            workItems: {
              select: {
                name: true,
                hoursSpent: true,
                hoursEstimated: true,
              },
            },
          },
        });

        const requirementsRemaining = requirements.map((req) => {
          return req.workItems.reduce(function (sum, current) {
            return sum + current.hoursEstimated - current.hoursSpent;
          }, 0);
        });

        const projectRemaining = requirementsRemaining.reduce(function (sum, current) {
          return sum + current;
        }, 0);

        const daysNeeded = projectRemaining / 20;

        return String(new Date().getTime() + daysNeeded * 24 * 60 * 60 * 1000);
      },
      projectVelocity: async (parent, args, ctx) => {
        const requirements = await ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
          },
          select: {
            workItems: {
              select: {
                hoursSpent: true,
                hoursEstimated: true,
              },
            },
          },
        });

        const requirementsSpent = requirements.map((req) => {
          return req.workItems.reduce(function (sum, current) {
            return sum + current.hoursSpent;
          }, 0);
        });

        const projectSpent = requirementsSpent.reduce(function (sum, current) {
          return sum + current;
        }, 0);

        let weeksPassed = (new Date().getTime() - new Date(Number(parent.createdAt)).getTime()) / 1000;
        weeksPassed /= 60 * 60 * 24 * 7;

        const vel = projectSpent / weeksPassed;
        return vel.toFixed(2);
      },
      hourlyEfficiency: (parent, args, ctx) => {
        return 28;
      },
      openRequirements: (parent, args, ctx) => {
        return ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
            OR: [
              {
                stage: {
                  equals: "ondeck",
                },
              },
              {
                stage: {
                  equals: "inprogress",
                },
              },
            ],
          },
        });
      },
      awaitingApprovals: (parent, args, ctx) => {
        return ctx.prisma.requirement.findMany({
          where: {
            projectId: parent.id,
            OR: [
              {
                stage: {
                  equals: "waitingapproval",
                },
              },
            ],
          },
        });
      },
    },
  },
};

export default projectService;
