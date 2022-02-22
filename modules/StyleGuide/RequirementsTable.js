
const lastUpdated = 'Last updated: ' + new Date().toLocaleDateString();

const requirements = [
    {
      id: '001',
      title: 'Loan officers should be able to sign in',
      description: 'They need to be able to sign in with LinkedIn and Google, and view a dashboard.',
      status: 'In Progress',
      estimatedTime: '2 hours',
      actualTime: '1 hour',
      priority: 'High',
    },
    {
        id: '002',
        title: 'Loan officers should be able to sign in',
        description: 'They need to be able to sign in with LinkedIn and Google, and view a dashboard.',
        status: 'In Progress',
        estimatedTime: '2 hours',
        actualTime: '1 hour',
        priority: 'High',
      },
      {
        id: '003',
        title: 'Loan officers should be able to sign in',
        description: 'They need to be able to sign in with LinkedIn and Google, and view a dashboard.',
        status: 'In Progress',
        estimatedTime: '2 hours',
        actualTime: '1 hour',
        priority: 'High',
        },
  ]
  
  export default function Example() {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className=" overflow-hidden border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-regular text-gray-400"
                    >
                      {lastUpdated}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-grayscale-900"
                    >
                      Estimate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-grayscale-900"
                    >
                      Hours Spent
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-grayscale-900"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-grayscale-900"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requirements.map((requirement) => (
                    <tr key={requirement.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-xs font-medium text-grayscale-900">R{requirement.id}</div>
                            <div className="text-sm font-medium text-purple-500">{requirement.title}</div>
                            <div className="text-sm text-gray-500">{requirement.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-purple-500">{requirement.estimatedTime}</div>
                      </td>
                      <td className="px-6 py-4 font-medium  whitespace-nowrap">
                      {requirement.actualTime}
                        
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {requirement.priority}
                        </span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {requirement.status}
                        </span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-purple-500 hover:text-purple-900">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
</svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }  