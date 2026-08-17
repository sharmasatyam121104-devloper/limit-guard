const ApiPlaygroundSkeleton = () => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto animate-pulse">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded-md" />
          <div className="h-4 w-72 bg-gray-200 rounded-md mt-2" />
        </div>

        {/* Refresh Button */}
        <div className="h-10 w-24 bg-gray-200 rounded-xl shrink-0" />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-gray-200 rounded-lg shrink-0" />

            <div className="space-y-2 min-w-0">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Configuration */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <div className="h-4 w-32 bg-gray-200 rounded-md mb-5" />

          <div className="space-y-4">
            {/* Method + Select */}
            <div className="flex gap-2">
              <div className="h-10 w-14 bg-gray-200 rounded-lg shrink-0" />

              <div className="h-10 w-full bg-gray-200 rounded-lg" />
            </div>

            {/* Send Button */}
            <div className="h-12 w-full bg-gray-200 rounded-xl" />
          </div>
        </div>

        {/* Response Box */}
        <div className="bg-gray-900 rounded-3xl p-6 shadow-xl flex flex-col min-h-55">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-gray-700 rounded" />
            <div className="h-4 w-20 bg-gray-700 rounded" />
          </div>

          <div className="space-y-3">
            <div className="h-3 w-4/5 bg-gray-800 rounded" />
            <div className="h-3 w-3/5 bg-gray-800 rounded" />
            <div className="h-3 w-2/3 bg-gray-800 rounded" />
            <div className="h-3 w-1/2 bg-gray-800 rounded" />
            <div className="h-3 w-3/4 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPlaygroundSkeleton;