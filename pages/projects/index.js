import DashboardNav from "../../modules/Common/DashboardNav";
import DashboardMainContainer from "../../modules/Common/DashboardMainContainer";
import DashboardHeader from "../../modules/Projects/DashboardHeader";
import ProjectTable from "../../modules/Projects/ProjectTable";
import { getSession } from "next-auth/react";
import BasicFooter from "../../modules/Common/BasicFooter";

export default function Projects({ session }) {
  return (
    <div>
      <DashboardNav />
      <DashboardMainContainer>
        <div className="container mx-auto">
        <DashboardHeader />
        <ProjectTable session={session} />
        
        </div>
        
      </DashboardMainContainer>
      <BasicFooter />
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
