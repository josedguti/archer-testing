import { ExclamationIcon } from '@heroicons/react/solid'

export default function InfoAlert({ text }) {
  return (
    <div className="rounded-md bg-purple-100 p-4 flex-initial w-2/3">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-purple-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-purple-500">{text}</p>
        </div>
      </div>
    </div>
  )
}