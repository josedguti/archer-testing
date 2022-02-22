
import DashboardNav from "../modules/Common/DashboardNav";
import DashboardMainContainer from "../modules/Common/DashboardMainContainer";
import { getSession } from "next-auth/react";
import InformationCard from "../modules/StyleGuide/InformationCard";
import RequirementsTable from "../modules/StyleGuide/RequirementsTable";
import StatusCard from "../modules/StyleGuide/StatusCard";
import ProjectPageStructure from "../modules/StyleGuide/ProjectPageStructure";  


export default function Projects({ session }) {
  return (
    <div>
        <DashboardNav />
        <DashboardMainContainer>
            <ProjectPageStructure projectId='001' />
        </DashboardMainContainer>

      <DashboardNav />
      <DashboardMainContainer>
        <h2 className="text-2xl font-bold mt-4 mb-8">Web UI Style Guide</h2>
        <p className="text-base font-regular w-full lg:w-1/3 mb-8">
            This page is for developers. It explains the web UI for Archer with 
            some technical explaination on the React components and Tailwind 
            classes we use to make things look pretty.
        </p>

        <hr className="mb-8" />
        <h3 className="text-xl font-medium">Elements</h3>

        <div className="w-full lg:w-2/3 mx-auto">
            <div className="flex flex-col w-full">
                <main className="flex-1 w-full">
                    <div className="py-6">
                        <div className=" mx-auto sm:px-6 md:px-8 w-full">
                            <InformationCard
                                title="Body text"
                                useCase="Used as the default text in all cases."
                                code={`
                                    <p className="text-base font-regular">This is an example of base text.</p>
                                `} 
                                demo={
                                    <p className="text-base font-regular w-80">This is an example of base text. It can be used for one-liners or multi-line texts.</p>
                                } />

                            <InformationCard
                                title="Page Headers"
                                useCase="Used as the title headers for application pages."
                                code={`
                                    <h2 className="text-2xl font-bold">Projects</h2>
                                `} 
                                demo={
                                    <h2 className="text-2xl font-bold">Projects</h2>
                                } />

                            <InformationCard
                                title="Homepage Header"
                                useCase="Used for the homepage intro text."
                                code={`
                                    <h1 className="text-3xl font-bold text-white">Introducing <span className="opacity-75">Archer</span></h1>
                                `} 
                                demo={
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-300 p-8 rounded-lg">
                                        <h1 className="text-3xl font-bold text-white">Introducing <span className="opacity-75">Archer</span></h1>
                                    </div>
                                } />
                            
                            <InformationCard
                                title="Caption"
                                useCase="Used for tabs and labels."
                                code={`
                                    <h4 className="text-md font-medium">Hours remaining</h4>
                                `} 
                                demo={
                                    <h4 className="text-md font-medium">Hours remaining</h4>
                                } />

                            <InformationCard
                                title="Small Heading"
                                useCase="Used for headings on non-focus functionality."
                                code={`
                                    <h5 className="text-lg font-regular">Need an account?</h5>
                                `} 
                                demo={
                                    <h5 className="text-lg font-regular">Need an account?</h5>
                                } />
                            
                            <InformationCard
                                title="Standard Heading"
                                useCase="Used for headings on focus functionality and project titles."
                                code={`
                                    <h3 className="text-xl font-medium">Super Duper Project</h3>
                                `} 
                                demo={
                                    <h3 className="text-xl font-medium">Super Duper Project</h3>
                                } />

                            <InformationCard
                                title="Gradients"
                                useCase="Sometimes used for backgrounds on emphasized sections."
                                code={`
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-300"></div>
                                `} 
                                demo={
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-300 p-8 rounded-lg"></div>
                                } />    
                            


                        </div>
                    </div>
                </main>
            </div>
        </div>

        <hr className="mb-8" />
        <h3 className="text-xl font-medium mb-8">Components</h3>
        <RequirementsTable />

        <StatusCard />
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