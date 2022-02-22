export default function DashboardMainContainer({ children }) {
  return (
    <>
      <div>
        <div className=" flex flex-col">
          <main className="flex-1">
            <div className="pt-6">
              <div className="mx-auto">
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
