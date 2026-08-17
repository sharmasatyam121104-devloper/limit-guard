import { useEffect, useState } from "react";
import { Play,  RefreshCw, Code2, Activity, ShieldAlert, Clock, Inbox } from "lucide-react";
import httpRequest from "../../utils/httpRequest";
import clientCatchError from "../../utils/clientCatchError";
import type { PlayGroundApiListInterface } from "../../interfaces/playGround.interface";
import type { RateLimitStatusDataInterface } from "../../interfaces/rateLimit.interface";
import ApiPlaygroundSkeleton from "../../components/skeletons/ApiPlaygroundSkeleton";

const ApiPlayground = () => {
  const [endpoints, setEndpoint] = useState<PlayGroundApiListInterface[] | null>(null);
  const [selectedUrl, setSelectedUrl] = useState("/product");
  const [statsApiData, setStatsApiData] = useState<RateLimitStatusDataInterface| null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [refreshLoading, setRefreshLoading] = useState(false);


  const handleCounter = ()=>{
    setCounter(prev=>prev+1);
  }
  

  
  useEffect(()=>{
    const fetchPlayGroundApiLists = async()=>{
      try {
        const {data} = await httpRequest.get("play-ground/api-list");
        setEndpoint(data.routes);
      } 
      catch (error) {
        clientCatchError(error);
      }
    }

    fetchPlayGroundApiLists();
  },[])

  useEffect(()=>{
    const fetchRateLimitStatus = async()=>{
      try {
        setRefreshLoading(true);
        const {data} = await httpRequest.get('rate-limit');
        setStatsApiData(data.data);
      } 
      catch (error) {
        clientCatchError(error);
      }
      finally{
        setRefreshLoading(false);
      }
    }

    fetchRateLimitStatus();
  },[counter])

  console.log(statsApiData);

  const stats = [
    { label: "Status", value: statsApiData?.status || "loading..", icon: Activity, color: "text-green-500" },
    { label: "Rate Limit", value: statsApiData?.rateLimit || "loading..", icon: ShieldAlert, color: "text-indigo-500" },
    {
      label: "Remaining",
      value:
        statsApiData?.remainingRequests ??
        (statsApiData?.usedRequests === 5 ? "0" : "loading"),
      icon: Inbox,
      color: "text-blue-500"
    },
    { label: "Reset In", value: statsApiData?.windowReset   || "loading..", icon: Clock, color: "text-orange-500" },
  ];

  const fetchPlayGroundApiData = async () => {
    try {
      setLoading(true);
      const { data } = await httpRequest.get(`play-ground${selectedUrl}`);
      setResponse(data);
      setCounter(prev=>prev+1);
    } catch (error) {
      clientCatchError(error);
    }
    finally{
      setLoading(false);
    }
  };

  if(loading) return <ApiPlaygroundSkeleton/>

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            API Playground
          </h1>

          <p className="text-sm text-gray-500">
            Test and monitor your endpoint performance
          </p>
        </div>

        <button
          onClick={handleCounter}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={refreshLoading ? "animate-spin" : ""}
          />

          <span>Refresh</span>

          <span className="text-xs text-gray-400">
            {/* {refreshTimer}s */}
          </span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{stat.label}</p>
              <p className="text-sm font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Configuration */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Request Config</h3>
          <div className="space-y-4">
            {/* URL Selector Dropdown */}
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg text-sm self-center">GET</span>
              <select 
                value={selectedUrl}
                onChange={(e) => setSelectedUrl(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500"
              >
                {endpoints?.map((ep:PlayGroundApiListInterface) => (
                  <option key={ep.path} value={ep.path}>{ep.path}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={fetchPlayGroundApiData}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              {refreshLoading ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>

        {/* Response Box */}
        <div className="bg-gray-900 rounded-3xl p-6 shadow-xl text-gray-300 font-mono text-sm overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-indigo-400"><Code2 size={18} /> <span>Response</span></div>
          </div>
          <pre className="overflow-x-auto text-xs md:text-sm">
            {response ? JSON.stringify(response, null, 2) : <span className="text-gray-600 italic">// Select endpoint and hit send</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiPlayground;