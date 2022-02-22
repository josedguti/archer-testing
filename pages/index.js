import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ session }) {
  const router = useRouter();

  router.push("/projects");
  return <></>;
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/projects",
    },
  };
}
