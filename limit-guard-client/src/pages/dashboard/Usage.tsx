import { BarChart2, ShieldAlert, Clock } from "lucide-react";

const Usage = () => {
  // Dummy Data
  const stats = [
    { title: "Total Requests", value: "128", change: "+12%", icon: BarChart2, color: "text-indigo-600" },
    { title: "Blocked Requests", value: "3", change: "0%", icon: ShieldAlert, color: "text-red-500" },
    { title: "Avg Latency", value: "142ms", change: "-5ms", icon: Clock, color: "text-emerald-500" },
  ];

  const topEndpoints = [
    { path: "/products", count: 84 },
    { path: "/users", count: 32 },
    { path: "/auth/login", count: 12 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">API Usage Analytics</h1>
        <p className="text-sm text-gray-500">Monitor your request patterns and performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Detailed Table / List Section */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Top Endpoints</h3>
        </div>
        <div className="p-6 space-y-6">
          {topEndpoints.map((ep, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{ep.path}</span>
                <span className="font-bold text-gray-900">{ep.count} requests</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${(ep.count / 100) * 100}%` }} 
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Usage;