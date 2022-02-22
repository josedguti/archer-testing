/* This example requires Tailwind CSS v2.0+ */
const stats = [
    { name: 'Hours spent', stat: '1,248' },
    { name: 'Open requirements', stat: '41' },
    { name: 'Approved work items', stat: '247' },
  ]
  
  export default function Example() {
    return (
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 bg-white shadow-md rounded-2xl border-solid border border-gray-200 overflow-hidden sm:p-6">
              
              <dd className="mt-1 text-xl font-medium text-gray-900 text-center">{item.stat}</dd>
              <dt className="text-sm font-medium text-gray-500 truncate text-center">{item.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    )
  }
  