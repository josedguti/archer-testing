import { Table, Tag } from "antd";
import { RightOutlined } from "@ant-design/icons";
import InfoAlert from "../Common/InfoAlert";
import approveRequirement from "./hooks/approveRequirement";

export default function RequirementsTableSection({ project }) {
  const handleApprove = (id) => {
    return approveRequirement(id);
  };

  const columns = [
    {
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="flex flex-col">
            <p className="-mt-2.5 pb-3">{record.number}</p>
            <p className="-mt-2.5 text-sm font-medium text-purple-500 pb-3 pl-2">
              {record.name}
            </p>
            <p className="-mt-2 text-xxs px-1 text-gray-400 pb-3 pl-2">
              {record.description}
            </p>
          </div>
          {/* <div className="mt-2">
            <p className="font-bold inline text-xs mr-2 pb-3 pl-2">{record.progress}</p>
            <div className="py-2 inline">
              <div className="inline px-20 bg-gray-300 rounded-xl pb-3 pl-2"></div>
            </div>
          </div> */}
        </div>
      ),
    },
    {
      title: "Estimate",
      dataIndex: "estimate",
      key: "estimate",
      render: (text, record) => (
        <span className="text-md font-bold text-purple-500 flex flex-row justify-center">
          {record.estimate} hrs
        </span>
      ),
    },
    {
      title: "Actual",
      dataIndex: "actual",
      key: "actual",
      render: (text, record) => (
        <span className="text-md font-bold text-purple-900 flex flex-row justify-center">
          {record.actual} hrs
        </span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text, record) => (
        <span className="text-md font-medium text-purple-900 capitalize flex flex-row justify-center">
          {record.priority}
        </span>
      ),
    },
    {
      title: "Status",
      key: "id",
      dataIndex: "tags",
      render: (tags, record) => (
        <>
          {tags.map((tag) => {
            if (tag === "waitingapproval") {
              return (
                <div className="flex flex-row justify-center">
                  <button
                    className="bg-purple-500 text-white text-xxs px-4 py-1.5 rounded-md"
                    key={tag}
                  >
                    Approve Requirement
                  </button>
                </div>
              );
            } else if (tag === "inprogress") {
              return (
                <div className="flex flex-row justify-center text-md font-medium text-purple-900" key={tag}>
                    In progress
                </div>
              );
            } else if (tag === "ondeck") {
              return (
                <div className="flex flex-row justify-center text-md font-medium text-purple-900" key={tag}>
                    On deck
                </div>
              );
            } else if (tag === "makingestimate") {
              return (
                <div className="flex flex-row justify-center text-md font-medium text-purple-900" key={tag}>
                    Making estimate
                </div>
              );
            }
            return (
              <div className="flex flex-row justify-center text-md font-medium text-purple-900 capitalize" key={tag}>
                  {tag}
              </div>
            );
          })}
        </>
      ),
    },
    {
      key: "action",
      render: (text, record) => (
        {/*<div className="flex flex-col self-end">
          
          <a className="text-xs text-gray-400 pb-5 self-end">Archive</a>
          <div className="inline px-2 text-purple self-end">
            <RightOutlined />
          </div> 
        </div>*/}
      ),
    },
  ];
  const projectData = project.requirements.map((e) => {
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      progress: e.stage,
      estimate: e.totalHoursEstimated,
      actual: e.totalHoursSpent,
      priority: e.priority,
      tags: [e.stage],
    };
  });
  const count = "waitingapproval";
  const approveCount = projectData.filter((x) => {
    return count.includes(x.tags);
  }).length;

  return (
    <>
      <div className="w-full bg-grayscale-100 border-t border-gray-200 pb-16">
        <div className="container mx-auto">
          <div className="mx-8">
            <div className="flex flex-row mt-5 w-full">
              <InfoAlert
                text={approveCount + " requirement is ready to be approved."}
              />
            </div>
            <div className="border-l border-r border-b border-t  mt-6">
              <div className="">
                <Table
                  dataSource={projectData}
                  columns={columns}
                  onRow={(record, rowKey) => {
                    return {
                      onClick: () => {
                        return handleApprove(projectData[rowKey].id);
                      },
                    };
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
