import { gql } from "apollo-server-core";

const userService = {
  schema: gql`
    type User {
      id: String
      name: String
      projects: [Project]
    }

    input UserFilter {
      id: String
      name: String
      username: String
    }

    extend type Query {
      users(filter: UserFilter): [User]
      user(filter: UserFilter): User
    }
  `,
  resolvers: {
    Query: {
      users: (_, { filter }, ctx) => {
        return ctx.prisma.user.findMany({
          where: {
            id: filter?.id,
            name: filter?.name,
            username: filter?.username,
          },
        });
      },
      user: async (_, { filter }, ctx) => {
        return ctx.prisma.user.findUnique({
          where: {
            username: ctx.session.user.username,
          },
        });
      },
    },
    User: {
      projects: async (parent, args, ctx) => {
        const data = await ctx.prisma.project.findMany({
          where: {
            users: {
              some: {
                userId: parent.id,
              },
            },
          },
          include: {
            requirements: {
              select: {
                name: true,
                stage: true,
              },
            },
          },
        });

        return data;
      },
    },
  },
};

export default userService;
