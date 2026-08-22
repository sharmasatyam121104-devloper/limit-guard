import { Bell } from "lucide-react";

interface Notification {
  title: string;
  message: string;
}

const Notification = () => {
  const notifications: Notification[] = [];

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
            <Bell className="h-5 w-5 text-[#4F46E5]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Notifications
            </h1>

            <p className="text-sm text-gray-500">
              Stay updated with your account and API activity
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        {notifications.length === 0 ? (
          <div className="flex min-h-87.5 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <Bell className="h-7 w-7 text-[#4F46E5]" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              You don't have any notifications
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
              We'll notify you when there's something important to
              share with you.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 transition-colors hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                  <Bell className="h-5 w-5 text-[#4F46E5]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {notification.title}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;