import DashboardNav from "../../../../modules/Common/DashboardNav";
import BasicFooter from "../../../../modules/Common/BasicFooter";
import DashboardMainContainer from "../../../../modules/RequirementsHome/DashboardMainContainer";
import SectionTabs from "../../../../modules/RequirementsHome/SectionTabs";
import ProgressSection from "../../../../modules/RequirementsHome/ProgressSection";
import RequirementsTableSection from "../../../../modules/RequirementsHome/RequirementsTableSection";
import sectionTabsData from "../../../../modules/RequirementsHome/constants/sectiontabs.json";
import { getSession } from "next-auth/react";
import useRequirementSectionPicker from "../../../../modules/RequirementsHome/hooks/useRequirementSection";
import useRequirementDataLoader from "../../../../modules/RequirementsHome/hooks/useRequirementDataLoader";

export default function Requirements() {
  const { pickedSection, handleChangeSection } = useRequirementSectionPicker();
  const { project, loading } = useRequirementDataLoader();

  return (
    <div>
      <DashboardNav />

      <DashboardMainContainer>
        {loading ? (
          <div className="flex items-center justify-center space-x-2 py-24 animate-pulse">
            <div className="w-4 h-4 bg-black rounded-full"></div>
            <div className="w-4 h-4 bg-black rounded-full"></div>
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
        ) : (
          <>
            <>
              <div className="container mx-auto">
                <div className="md:flex md:items-center md:justify-between mt-2 mb-2 mx-8">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-medium text-gray-900 mt-4 mb-10">
                      {project?.name}
                      <span className="text-sm text-gray-400 mx-4">
                        {project
                          ? project.name.toLowerCase().replace(" ", "-")
                          : ""}
                      </span>
                    </h2>
                  </div>
                </div>
                {/* <div className="mt-4 flex md:mt-0 md:ml-4">
        <Link href={router.isReady ? router.asPath + `/add` : "#"}>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add requirement
          </button>
        </Link>
      </div> */}
              </div>
            </>
            <>
              <div className="">
                <SectionTabs
                  tabs={sectionTabsData}
                  changeHandler={handleChangeSection}
                  currentSectionName={pickedSection}
                />
                {pickedSection === "progress" ? (
                  <ProgressSection loading={loading} project={project} />
                ) : (
                  <></>
                )}
                {pickedSection === "requirements" ? (
                  <RequirementsTableSection
                    loading={loading}
                    project={project}
                  />
                ) : (
                  <></>
                )}
              </div>
            </>
          </>
        )}
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
