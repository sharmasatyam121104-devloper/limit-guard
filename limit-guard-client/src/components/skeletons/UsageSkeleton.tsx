const UsageSkeleton = () => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-7 w-56 bg-gray-200 rounded-md" />
        <div className="h-4 w-72 bg-gray-200 rounded-md mt-2" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-gray-200 rounded-2xl mb-4" />

            {/* Title */}
            <div className="h-4 w-32 bg-gray-200 rounded-md" />

            {/* Value */}
            <div className="h-7 w-24 bg-gray-200 rounded-md mt-2" />
          </div>
        ))}
      </div>

      {/* Top Endpoints */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="h-5 w-36 bg-gray-200 rounded-md" />
        </div>

        {/* Endpoint List */}
        <div className="p-6 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              {/* Path + Requests */}
              <div className="flex justify-between items-center gap-4">
                <div className="h-6 w-36 md:w-48 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
              </div>

              {/* Progress */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 bg-gray-300 rounded-full w-[60%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageSkeleton;