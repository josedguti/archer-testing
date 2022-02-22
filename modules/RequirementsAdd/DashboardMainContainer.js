export default function DashboardMainContainer({ children }) {
  return (
    <>
      <div>
        <div className="md:pl-64 flex flex-col">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
