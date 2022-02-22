import ProgressChart from "./ProgressChart.tsx";
import { formateDate_Month_long_DD_YYY, formateDate_Month_short_DD_YYY } from "../Projects/utils/date-formatter";

export default function ProgressSection({ loading, project }) {
  return (
    <div className="w-full bg-grayscale-100 border-t border-gray-200 pb-16">
      <div className="container mx-auto">
      <div className="mx-8">
        <div className="grid justify-items-stretch text-lg my-6 ">
          <p className="justify-self-start text-lg font-regular">
            {formateDate_Month_short_DD_YYY(Number(project.createdAt))} - Today
          </p>
        </div>
        <div className="grid grid-cols-6  gap-1.5 sm:gap-3 ">
          <div className="shadow-md h-40 col-span-1 rounded-lg border border-gray-200 bg-white text-center  md:px-0 md:pt-4 pt-6 px-3">
            <div className="pt-6 px-2 flex flex-col items-center">
              <p className="text-xl font-medium text-gray-900 mb-1">{project.totalHoursSpent ? project.totalHoursSpent : 0}</p>
              <p className="mt-5 text-md font-medium text-gray-500 mb-0">Hours spent</p>
            </div>
          </div>
          <div className="shadow-md h-40 col-span-1 rounded-lg border border-gray-200 bg-white text-center  md:px-0 md:py-4 py-6 px-3">
            <div className="pt-6 px-2 flex flex-col align-center">
              <p className="text-xl font-medium text-gray-900 mb-1">
                {project.openRequirements ? project.openRequirements.length : 0}
              </p>
              <p className="mt-5 text-md font-medium text-gray-500 mb-0">Open requirements</p>
            </div>
          </div>

          <div className="shadow-md h-40 col-span-1 rounded-lg border bg-white border-gray-200 text-center  md:px-0 md:py-4 py-6 px-3 ">
            <div className="pt-6 flex flex-col align-center">
              <p className="text-xl font-medium text-gray-900 mb-1">
                {" "}
                {project.openRequirements
                  ? project.openRequirements.reduce((sum, currentReq) => {
                      return currentReq.workItems.length + sum;
                    }, 0)
                  : 0}
              </p>
              <p className="mt-5 text-md font-medium text-gray-500 mb-0">Approved work items</p>
            </div>
          </div>

          <div className="shadow-md min-h-40 col-span-1 rounded-lg border bg-white border-gray-200 text-center  md:px-0 md:py-4 py-6 px-3 ">
            <div className="pt-6 flex flex-col align-center">
              <p className="text-xl font-medium text-gray-900 mb-1">
                {" "}
                {project.totalHoursRemaining ? project.totalHoursRemaining : 0}
              </p>
              <p className="mt-5 text-md font-medium text-gray-500 mb-0">Hours remaining</p>
            </div>
          </div>
          <div className="shadow-md h-40 col-span-2 rounded-lg border bg-white border-gray-200 text-center iphoneX:py-3 mobileS:py-2  galaxyFold:py-2 md:py-4 sm:py-4   xs:py-2 ">
            <p className="my-3 text-md font-medium mb-0">Estimated completion</p>
            <p className="my-3 text-xl font-medium text-purple-900">
              {formateDate_Month_long_DD_YYY(Number(project.estimatedCompletionDate))}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-500">based on this project’s velocity</p>
          </div>
        </div>

        <div className="grid grid-cols-4 galaxyFold:gap-1 xs:gap-1.5 sm:gap-3 py-3 mt-6">
          <div className="shadow-md rounded-lg border border-gray-200 py-6 px-6  text-center col-span-3 bg-white">
            <p className="text-left mt-1 text-md font-medium mb-6">Work Overview</p>
            <ProgressChart />
          </div>
          <div className="col-span-1 md:space-y-3">
            <div className="shadow-md rounded-lg border border-gray-200 text-center flex px-3 h-40 items-center">
              <div className="align-middle w-full">
                <p className="my-3 text-md font-medium mb-0">Velocity</p>
                <p className="my-3 text-xl font-medium">{project.projectVelocity}</p>
                <p className="mt-2 text-sm font-medium text-gray-500">avg. hours per week</p>
              </div>
            </div>
            <div className="shadow-md rounded-lg border border-gray-200 text-center flex px-3 h-40 items-center">
              <div className="align-middle w-full">
                <p className="my-3 text-md font-medium mb-0">Contributors</p>
                <p className="my-3 text-xl font-medium">{project.contributors ? project.contributors.length : 0}</p>
                <p className="mt-2 text-sm font-medium text-gray-500"></p>
              </div>
            </div>
            <div className="shadow-md rounded-lg border border-gray-200 text-center flex px-3 h-40 items-center">
              <div className="align-middle w-full">
                <p className="my-3 text-md font-medium mb-0">Hourly efficiency</p>
                <p className="my-3 text-xl font-medium">{project.hourlyEfficiency}</p>
                <p className="mt-2 text-sm font-medium text-gray-500">avg. hours per work items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
