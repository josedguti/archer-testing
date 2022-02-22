import DashboardNav from "../../modules/Common/DashboardNav";
import DashboardMainContainer from "../../modules/Common/DashboardMainContainer";
import AddOrganizationForm from "../../modules/AddOrganization/AddOrganizationForm";
import { getSession } from "next-auth/react";

export default function AddOrganizationPage({ session }) {
  return (
    <div>
      <DashboardNav />
      <DashboardMainContainer>
        <AddOrganizationForm session={session} />
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
