import { apolloServer } from "../../graphql";

const startServer = apolloServer.start();

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req, res) {
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}