/* This component is used to display examples and implementations of Tailwind styles for Archer's UI */
export default function InformationCard({ title, useCase, code, demo }) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 my-6">
        <div className="px-4 py-5 sm:px-6">
            <h5 className="text-lg font-regular">{title}</h5>
            <p className="text-base font-regular text-gray-400">{useCase}</p>
        </div>
        <div className="px-4 py-5 sm:p-6 bg-black">
            <code className="text-mono text-gray-200">
                {code}
            </code>
        </div>
        <div className="px-4 py-4 sm:px-6">
          {demo}
        </div>
      </div>
    )
  }
  