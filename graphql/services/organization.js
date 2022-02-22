import { gql } from "apollo-server-core";

const organizationService = {
  schema: gql`
    type Organization {
      id: String
      name: String
      userId: String
      projects: [Project]
    }

    input OrganizationFilter {
      userId: String
    }

    extend type Query {
      organizations(filter: OrganizationFilter): [Organization]
    }

    extend type Mutation {
      createOrganization(userId: String!, name: String!): Organization
    }
  `,
  resolvers: {
    Query: {
      organizations: (_, { filter }, ctx) => {
        return ctx.prisma.organization.findMany({
          where: {
            userId: filter?.userId,
          },
        });
      },
    },
    Mutation: {
      createOrganization: (parent, args, ctx) => {
        return ctx.prisma.organization.create({
          data: {
            name: args.name,
            users: {
              create: [{ user: { connect: { id: args.userId } } }],
            },
          },
        });
      },
    },
    Organization: {
      projects: (parent, args, ctx) => {
        return ctx.prisma.project.findMany({
          where: {
            organizationId: parent.id,
          },
        });
      },
    },
  },
};

export default organizationService;
