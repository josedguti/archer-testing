import DashboardNav from "../../modules/Common/DashboardNav";
import DashboardMainContainer from "../../modules/Common/DashboardMainContainer";
import ProjectForm from "../../modules/Projects/ProjectForm";
import { getSession } from "next-auth/react";

export default function ProjectFormPage({ session }) {
  return (
    <div>
      <DashboardNav />
      <DashboardMainContainer>
        <ProjectForm session={session} />
      </DashboardMainContainer>
    </div>
  );
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
    props: {
      session,
    },
  };
}
