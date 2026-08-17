const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 animate-pulse">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="h-7 w-48 bg-gray-200 rounded-md" />
            <div className="h-4 w-64 bg-gray-200 rounded-md mt-2" />
          </div>

          {/* Edit Button */}
          <div className="h-10 w-24 bg-gray-200 rounded-xl" />
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10">

          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-10">
            {/* Avatar */}
            <div className="h-28 w-28 rounded-full bg-gray-200 mb-4" />

            {/* Name */}
            <div className="h-6 w-36 bg-gray-200 rounded-md" />

            {/* Role */}
            <div className="h-5 w-20 bg-gray-200 rounded-full mt-2" />
          </div>

          {/* Details */}
          <div className="space-y-5">

            {/* Full Name */}
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>

            {/* Email + Auth Provider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Email */}
              <div className="space-y-2">
                <div className="h-3 w-28 bg-gray-200 rounded" />

                <div className="h-12 w-full bg-gray-200 rounded-xl" />
              </div>

              {/* Auth Provider */}
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded" />

                <div className="h-12 w-full bg-gray-200 rounded-xl" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;