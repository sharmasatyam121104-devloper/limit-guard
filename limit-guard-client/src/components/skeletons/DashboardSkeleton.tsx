const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <header className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded-md" />
          <div className="h-4 w-72 max-w-full bg-gray-200 rounded-md mt-2" />
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">

        {/* Current Status */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4"
              >
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-5 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* API Usage */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
          </div>

          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4"
              >
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-5 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* API Playground */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-3"
              >
                <div className="h-5 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-4 bg-gray-200 rounded shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-5 w-36 bg-gray-200 rounded" />
          </div>

          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4"
              >
                <div className="h-4 w-12 bg-gray-200 rounded shrink-0" />

                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>

                <div className="h-5 w-5 bg-gray-200 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Status Footer */}
      <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>

          {/* Statuses */}
          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-gray-200" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;