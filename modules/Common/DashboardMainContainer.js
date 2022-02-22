export default function DashboardMainContainer({ children }) {
  return (
    <>
      <div className="w-full px-0">
        <div className="flex flex-col w-full">
          <main className="flex-1 w-full">
            <div className="py-6">
              <div className=" mx-auto sm:px-6 md:px-8 w-full">
                {/* Replace with your content */}
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
