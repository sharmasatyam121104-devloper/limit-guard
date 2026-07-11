import { ShieldAlert, Activity, Hourglass, Inbox, AlertTriangle } from "lucide-react";

const RateLimit = () => {
  // Yeh data aapke API response se dynamic aayega
  const liveStatus = {
    status: "Active",
    rateLimit: "10 / minute",
    remaining: 6,
    resetIn: "42 sec"
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Rate Limit Monitor</h1>

      {/* Live Status Highlight Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <Activity size={16} /> {liveStatus.status}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rate Limit</span>
          <div className="flex items-center gap-2 text-indigo-600 font-bold">
            <ShieldAlert size={16} /> {liveStatus.rateLimit}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Remaining</span>
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <Inbox size={16} /> {liveStatus.remaining}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reset In</span>
          <div className="flex items-center gap-2 text-orange-500 font-bold">
            <Hourglass size={16} /> {liveStatus.resetIn}
          </div>
        </div>
      </div>

      {/* Warning section agar limit khatam hone wali ho */}
      {liveStatus.remaining < 3 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl flex items-center gap-3">
          <AlertTriangle size={20} />
          <p className="text-sm font-medium">You are running low on requests. Please wait for the window reset.</p>
        </div>
      )}
      
      {/* Yahan aap baaki detailed policy ya graphs add kar sakte hain */}
    </div>
  );
};

export default RateLimit;