import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import services from "./services";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma/prismClient";

const apolloServer = new ApolloServer({
  typeDefs: services.schema,
  resolvers: services.resolvers,
  context: async ({ req }) => {
    const session = await getSession({ req });
    return { session, prisma };
  },
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export { apolloServer };
