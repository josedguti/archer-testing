import { Tab } from '@headlessui/react'

const tabs = [
    { name: 'Progress', href: '#', current: true },
    { name: 'Requirements', href: '#', current: false },
    { name: 'Project Details', href: '#', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function ProjectPageStructure({ projectId }) {

  // Use `projectId` to fetch project data from the database.
  const project = {
    title: 'Super Duper Project',
  }

  return (
      <>
<Tab.Group>
<div className="my-4 pb-0 border-b border-gray-200">
      <h3 className="text-xl font-medium text-gray-900 mt-6 mb-14">{project.title}</h3>
        <div className="block">
          <nav className="-mb-px flex space-x-8">
          <Tab.List>
            {tabs.map((tab) => (
                <Tab key={tab.name}
                href={tab.href}
                className={({ selected }) =>
                classNames(
                  'whitespace-nowrap pb-4 px-1 mr-4 border-b-2 font-medium text-md focus:outline-none',
                  selected
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
                aria-current={tab.current ? 'page' : undefined}>{tab.name}</Tab>
            ))}
            </Tab.List>
          </nav>
        
      </div>
    </div>
    
      
      <Tab.Panels className='focus:border-none'>
      {tabs.map((tab) => (
                <Tab.Panel className='focus:border-none' key={tab.name}>{tab.name} content</Tab.Panel>
            ))}
    </Tab.Panels>
    </Tab.Group>
      </>
    
  )
}