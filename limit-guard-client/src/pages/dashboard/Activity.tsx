import { Terminal, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { ActivityLogDataItem } from "../../interfaces/activities.interface";
import clientCatchError from "../../utils/clientCatchError";
import httpRequest from "../../utils/httpRequest";
import moment from "moment"

const Activity = () => {
  // Dummy Activity Data
  const [activityData, setActivityData] = useState<ActivityLogDataItem[]>([])


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle2 className="text-emerald-500" size={18} />;
      case "failed": return <XCircle className="text-red-500" size={18} />;
      case "warning": return <AlertCircle className="text-amber-500" size={18} />;
      default: return <Clock className="text-gray-400" size={18} />;
    }
  };


  
  useEffect(()=>{
    const fetchActivityData = async()=>{
      try {
        const {data} = await httpRequest.get('/activity/recent')
        setActivityData(data.data)
      } 
      catch (error) {
       return clientCatchError(error) 
      }
    }

    fetchActivityData()
  },[])

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-sm text-gray-500">Track your account and API history</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Terminal size={18} className="text-indigo-600" />
          <h3 className="font-bold text-gray-900">Recent Events</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {activityData.map((act, index: number) => (
            <div key={index} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getStatusIcon(act.status)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{act.type}: /{act.message.split('/').pop()}</p>
                  <p className="text-xs text-gray-400">{moment(act.createdAt).startOf('hour').fromNow()}</p>
                </div>
              </div>
              
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                act.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                act.status === 'failed' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;