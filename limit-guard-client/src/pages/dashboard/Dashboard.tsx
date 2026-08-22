import {
  Play,
  BarChart2,
  Activity,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Wifi,
} from "lucide-react";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";
import {  useEffect, useMemo, useState } from "react";
import httpRequest from "../../utils/httpRequest";
import clientCatchError from "../../utils/clientCatchError";
import type { RateLimitStatusDataInterface } from "../../interfaces/rateLimit.interface";
import { Link } from "react-router-dom";
import type { ActivityLogDataItem } from "../../interfaces/activities.interface";
import moment from "moment";
import type { UsageDataItem } from "../../interfaces/usage.interafce";

const Dashboard = () => {
  const [loading, setLoading] = useState(false)

  const [liveStatusData, setLiveStatusData] = useState<RateLimitStatusDataInterface| null>(null);
  const [recentActivityData, setRecentActivityData] = useState<ActivityLogDataItem[]>([]);
  const [usageData, setUsageData] = useState<UsageDataItem[]>([]);


  const liveStatus = {
    status: liveStatusData?.status || "loading..",
    rateLimit: liveStatusData?.rateLimit || "loading..",
    remaining: liveStatusData?.remainingRequests || "loading..",
    resetIn: liveStatusData?.windowReset || "loading..",
  };
  
  const recentActivity = useMemo(() => {
  return [...recentActivityData]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
}, [recentActivityData]);

  const usageStats = useMemo(() => {
    const totalRequests = usageData.length;

    const blockedRequests = usageData.filter(
      (item) => item.status === "Failed"
    ).length;

    const endpointCounts = usageData.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.endpointName] = (acc[item.endpointName] || 0) + 1;
        return acc;
      },
      {}
    );

    const mostUsedApi =
      Object.entries(endpointCounts).sort(
        ([, a], [, b]) => b - a
      )[0]?.[0] || "No requests yet";

    return {
      totalRequests,
      blockedRequests,
      mostUsedApi,
    };
  }, [usageData]);

  useEffect(() => {
  const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [rateLimitResponse, recentActivityResponse, usageResponse] = await Promise.all([
          httpRequest.get("/rate-limit"),
          httpRequest.get("/activity/recent"),
          httpRequest.get("/usage")
        ]);

        setLiveStatusData(rateLimitResponse.data.data);
        setRecentActivityData(recentActivityResponse.data.data);
        setUsageData(usageResponse.data.data);

        console.log("usageResponse", recentActivityResponse.data.data);
      } catch (error) {
        clientCatchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if(loading){
    return <DashboardSkeleton/>
  }
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
              <span className="text-[#6B7280]">{liveStatus.status}</span>

              <span className="rounded bg-[#DCFCE7] px-2 py-0.5 text-xs font-bold text-[#166534]">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Rate Limit</span>

              <span className="font-semibold">{liveStatus.rateLimit}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Remaining Requests</span>

              <span className="font-semibold">{liveStatus.remaining}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Window Reset</span>

              <span className="font-semibold">{liveStatus.resetIn}</span>
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

              <span className="text-lg font-semibold"> {usageStats.totalRequests}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Blocked Requests</span>

              <span className="font-semibold text-[#EF4444]">{usageStats.blockedRequests}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#6B7280]">Most Used API</span>

              <span className="cursor-pointer font-medium text-[#4F46E5] break-all">
                {usageStats.mostUsedApi}
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
            {["/products", "/students", "/employees", "/movies", "/books"].map((path) => (
              <Link
                to={"/playground"}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#E5E7EB] p-3 transition-all hover:border-[#4F46E5] cursor-pointer"
              >
                <span className="font-mono text-sm break-all">
                  <span className="font-bold text-[#4F46E5]">GET</span> {path}
                </span>

                <ChevronRight className="h-4 w-4 shrink-0 text-[#6B7280]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
          <h3 className="mb-6 flex items-center gap-2 font-semibold text-gray-900">
            <Activity className="h-5 w-5 text-[#4F46E5]" />
            Recent Activity
          </h3>

          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((act, i) => {
                const endpoint = act.message.split("/").pop();

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3 transition-colors hover:bg-gray-50 sm:gap-4"
                  >
                    {/* Time */}
                    <div className="w-16 shrink-0 text-xs text-gray-500 sm:w-20">
                      {moment(act.createdAt).fromNow()}
                    </div>

                    {/* Activity */}
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                        <span
                          className={`w-fit rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                            act.type === "Success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {act.type}
                        </span>

                        <span className="truncate font-mono text-xs text-gray-700 sm:text-sm">
                          /{endpoint}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {act.message}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="shrink-0">
                      {act.status === "Success" ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50">
                          <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                        </div>
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50">
                          <XCircle className="h-4 w-4 text-[#EF4444]" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Activity className="mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">
                  No recent activity
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Your API activity will appear here.
                </p>
              </div>
            )}
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