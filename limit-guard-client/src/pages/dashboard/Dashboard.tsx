import {
  Play,
  BarChart2,
  Activity,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Wifi,
} from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <header className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">
            Hello, Satyam 👋
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Here's what's happening with your API usage today.
          </p>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Current Status */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-6 flex items-center gap-2 font-semibold">
            <Activity className="h-5 w-5 text-[#4F46E5]" />
            Current Status
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Status</span>

              <span className="rounded bg-[#DCFCE7] px-2 py-0.5 text-xs font-bold text-[#166534]">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Rate Limit</span>

              <span className="font-semibold">10 / minute</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Remaining Requests</span>

              <span className="font-semibold">6</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Window Reset</span>

              <span className="font-semibold">42 sec</span>
            </div>
          </div>
        </div>

        {/* API Usage */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-6 flex items-center gap-2 font-semibold">
            <BarChart2 className="h-5 w-5 text-[#4F46E5]" />
            Your API Usage
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Total Requests Today</span>

              <span className="text-lg font-semibold">128</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Blocked Requests</span>

              <span className="font-semibold text-[#EF4444]">3</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Most Used API</span>

              <span className="cursor-pointer font-medium text-[#4F46E5] break-all">
                /products
              </span>
            </div>
          </div>
        </div>

        {/* API Playground */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-6 flex items-center gap-2 font-semibold">
            <Play className="h-5 w-5 text-[#4F46E5]" />
            API Playground
          </h3>

          <div className="space-y-3">
            {["/products", "/profile", "/orders", "/messages"].map((path) => (
              <div
                key={path}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#E5E7EB] p-3 transition-all hover:border-[#4F46E5] cursor-pointer"
              >
                <span className="font-mono text-sm break-all">
                  <span className="font-bold text-[#4F46E5]">GET</span> {path}
                </span>

                <ChevronRight className="h-4 w-4 shrink-0 text-[#6B7280]" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-6 flex items-center gap-2 font-semibold">
            <Activity className="h-5 w-5 text-[#4F46E5]" />
            Recent Activity
          </h3>

          <div className="space-y-6">
            {[
              { time: "10:20", path: "/products", status: "ok" },
              { time: "10:23", path: "/products", status: "blocked" },
            ].map((act, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 shrink-0 text-xs text-[#6B7280]">
                  {act.time}
                </div>

                <div className="flex-1 break-all font-mono text-sm">
                  <span className="text-[#4F46E5]">GET</span> {act.path}
                </div>

                {act.status === "ok" ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#22C55E]" />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0 text-[#EF4444]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Status Footer */}
      <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-[#4F46E5]" />
            <span className="font-semibold">Live Status</span>
          </div>

          <div className="flex flex-col gap-3 text-sm text-[#6B7280] sm:flex-row sm:flex-wrap sm:gap-6">
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
              Connected to Server
            </span>

            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
              Redis Status : Connected
            </span>

            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
              Socket Status : Connected
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;