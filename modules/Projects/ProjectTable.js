import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  formateDate_Month_long_DD_YYY,
  formateDate_Month_short_DD_YYY,
} from "./utils/date-formatter";

export default function ProjectTable({ session }) {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      var data = JSON.stringify({
        query: `{
    
        user{
          projects{
          name
          id
          description
          totalHoursSpent
          totalHoursRemaining
          estimatedCompletionDate
          updatedAt
          awaitingApprovals{
            name
          }
        }
        }
      
    
    }`,
        variables: {},
      });

      var config = {
        method: "post",
        url: "/api/graphql",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);
      const responseProjects = response.data.data.user.projects;

      setLoading(false);
      setProjects(responseProjects);
    })();
  }, []);

  if (loading === true) {
    return (
      <div className="flex items-center justify-center space-x-2 py-24 animate-pulse">
        <div className="w-4 h-4 bg-black rounded-full"></div>
        <div className="w-4 h-4 bg-black rounded-full"></div>
        <div className="w-4 h-4 bg-black rounded-full"></div>
      </div>
    );
  } else {
    console.log(projects);
    return (
      <>
        {projects.length > 0 ? (
          <div className="mx-8">
            <div
              className="relative min-h-full flex flex-col mx-auto"
              style={{ maxWidth: "96rem" }}
            >
              {/* 3 column wrapper */}
              <div className="flex flex-col ">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 flex">
                  <div className="py-2 align-middle a inline-block mx-auto sm:px-6 lg:px-8 w-full">
                    <div className=" sm:rounded-lg">
                      <div className="bg-white sm:rounded-md ">
                        <ul role="list" className="">
                          {projects.map((project, Idx) => {
                            return (
                              <Link
                                href={`/projects/${project.id}/requirements`}
                                key={Idx}
                              >
                                <li className="mb-6 block hover:shadow-lg cursor-pointer px-4 py-5 bg-white shadow-md rounded-2xl border-solid border border-gray-200 overflow-hidden sm:p-6">
                                  <div className="items-center px-4 py-4 my-2 sm:px-6">
                                    <div className="min-w-full items-center ">
                                      <div className="min-w-0 flex-1 px-4 block lg:grid lg:grid-cols-3 lg:gap-4 ">
                                        <div className="col-span-1">
                                          <h3 className="text-xl font-medium text-grayscale-900 truncate">
                                            {project.name}
                                          </h3>
                                          <p className="mt-2 flex items-center text-md text-gray-900">
                                            {project.description}
                                          </p>
                                          {project.awaitingApprovals &&
                                          project.awaitingApprovals.length >
                                            0 ? (
                                            <p className="mt-2 flex items-center text-md text-indigo-600">
                                              {project.awaitingApprovals.length}{" "}
                                              {project.awaitingApprovals
                                                .length > 1
                                                ? "requirements"
                                                : "requirement"}{" "}
                                              needs approval
                                            </p>
                                          ) : (
                                            <p className="mt-3 flex items-center text-sm font-medium text-gray-400">
                                              Updated on{" "}
                                              {formateDate_Month_short_DD_YYY(
                                                Number(project.updatedAt)
                                              )}
                                            </p>
                                          )}
                                        </div>
                                        <div className=" mt-4 md:mt-0 grid grid-cols-3 space-x-6 w-full col-span-2 ">
                                          <div className="col-span-1">
                                            <div className="h-10">
                                              <p className="text-xl font-medium text-gray-900 text-center mt-4">
                                                {project.totalHoursSpent}
                                              </p>
                                            </div>
                                            <p className="mt-5 text-md font-medium text-gray-500 text-center">
                                              Hours spent
                                            </p>
                                          </div>

                                          <div className="col-span-1">
                                            <div className="h-10">
                                              <p className="text-xl font-medium text-gray-900 text-center mt-4">
                                                {project.totalHoursRemaining}
                                              </p>
                                            </div>
                                            <p className="mt-5 text-md font-medium text-gray-500 text-center">
                                              Hours remaining
                                            </p>
                                          </div>

                                          <div className="col-span-1">
                                            <div className="h-10">
                                              <p className="text-lg font-medium text-purple-500 text-center mt-4">
                                                {formateDate_Month_short_DD_YYY(
                                                  Number(
                                                    project.estimatedCompletionDate
                                                  )
                                                )}
                                              </p>
                                            </div>
                                            <p className="mt-5 text-md font-medium text-gray-500 text-center">
                                              Estimated completion
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-8">
              <div className="text-center mt-20">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  enableBackground="new 0 0 57 57"
                  version="1.1"
                  viewBox="0 0 57 57"
                  xmlSpace="preserve"
                >
                  <path d="M22.66 0H3.34A3.343 3.343 0 000 3.34v19.32A3.343 3.343 0 003.34 26h19.32A3.343 3.343 0 0026 22.66V3.34A3.343 3.343 0 0022.66 0zM33.34 26h19.32A3.343 3.343 0 0056 22.66V3.34A3.343 3.343 0 0052.66 0H33.34A3.343 3.343 0 0030 3.34v19.32A3.343 3.343 0 0033.34 26zM22.66 30H3.34A3.343 3.343 0 000 33.34v19.32A3.343 3.343 0 003.34 56h19.32A3.343 3.343 0 0026 52.66V33.34A3.343 3.343 0 0022.66 30zM55 41H45V31a2 2 0 00-4 0v10H31a2 2 0 000 4h10v10a2 2 0 004 0V45h10a2 2 0 000-4z"></path>
                </svg>
                <h3 className="mt-2 text-xl font-medium text-gray-900">
                  No project
                </h3>
                <p className="mt-1 text-lg text-gray-500">
                  Hmm, seems like you don&apos;t have any projects. Get started
                  by adding a project.
                </p>

                <div className="mt-6">
                  <Link href={"/projects/add"}>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      New project
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
