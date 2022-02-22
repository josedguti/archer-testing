function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SectionTabs({ changeHandler, currentSectionName, tabs }) {
  return (
    <div className="container mx-auto">
    <div className="pb-0 mx-8">
      
      <div className="mt-3 sm:mt-4">
        <div className="block">
        
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  changeHandler(tab.name.toLowerCase());
                }}
                className={classNames(
                  tab.name.toLowerCase() === currentSectionName
                    ? "border-black text-grayscale-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap pb-4 px-1 border-b-2  text-md font-medium "
                )}
                aria-current={tab.name.toLowerCase() === currentSectionName}
              >
                {tab.name}
              </button>
            ))}
          </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
