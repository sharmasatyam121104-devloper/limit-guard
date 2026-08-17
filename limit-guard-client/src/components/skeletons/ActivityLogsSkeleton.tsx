const ActivityLogsSkeleton = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-7 w-40 bg-gray-200 rounded-md" />
        <div className="h-4 w-64 bg-gray-200 rounded-md mt-2" />
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Card Header */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <div className="w-4.5 h-4.5 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded-md" />
        </div>

        {/* Activity Items */}
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 md:p-6 flex items-center justify-between gap-4"
            >
              {/* Left */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Icon */}
                <div className="w-10 h-10 shrink-0 bg-gray-200 rounded-full" />

                {/* Text */}
                <div className="min-w-0">
                  <div className="h-4 w-40 md:w-56 bg-gray-200 rounded-md" />
                  <div className="h-3 w-24 bg-gray-200 rounded-md mt-2" />
                </div>
              </div>

              {/* Status */}
              <div className="h-6 w-16 shrink-0 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsSkeleton;