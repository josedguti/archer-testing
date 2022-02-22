import DashboardNav from "../../../../modules/Common/DashboardNav";
import DashboardMainContainer from "../../../../modules/Common/DashboardMainContainer";
import DashboardHeader from "../../../../modules/RequirementsAdd/DashboardHeader";
import RequirementForm from "../../../../modules/RequirementsAdd/RequirementForm";
import { getSession } from "next-auth/react";

export default function Requirements() {
  return (
    <div>
      <DashboardNav />
      <DashboardMainContainer>
        <DashboardHeader />
        <RequirementForm />
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
