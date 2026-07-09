import {Play, BarChart2, Activity, CheckCircle2, XCircle, ChevronRight, Wifi } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8 ">
          {/* Top Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Hello, Satyam 👋</h1>
              <p className="text-[#6B7280]">Here's what's happening with your API usage today.</p>
            </div>

          </header>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Status */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold mb-6"><Activity className="w-5 h-5 text-[#4F46E5]"/> Current Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Status</span> <span className="bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded text-xs font-bold">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Rate Limit</span> <span className="font-semibold">10 / minute</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Remaining Requests</span> <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Window Reset</span> <span className="font-semibold">42 sec</span>
                </div>
              </div>
            </div>

            {/* API Usage */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold mb-6"><BarChart2 className="w-5 h-5 text-[#4F46E5]"/> Your API Usage</h3>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Total Requests Today</span> <span className="font-semibold text-lg">128</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Blocked Requests</span> <span className="font-semibold text-[#EF4444]">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Most Used API</span> <span className="text-[#4F46E5] font-medium cursor-pointer">/products</span>
                </div>
              </div>
            </div>

            {/* API Playground */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold mb-6"><Play className="w-5 h-5 text-[#4F46E5]"/> API Playground</h3>
              <div className="space-y-3">
                {['/products', '/profile', '/orders', '/messages'].map((path) => (
                  <div key={path} className="flex justify-between items-center border border-[#E5E7EB] p-3 rounded-lg hover:border-[#4F46E5] cursor-pointer transition-all">
                    <span className="font-mono text-sm"><span className="text-[#4F46E5] font-bold">GET</span> {path}</span>
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold mb-6"><Activity className="w-5 h-5 text-[#4F46E5]"/> Recent Activity</h3>
              <div className="space-y-6">
                {[
                  { time: '10:20', path: '/products', status: 'ok' },
                  { time: '10:23', path: '/products', status: 'blocked' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-xs text-[#6B7280] w-12">{act.time}</div>
                    <div className="flex-1 font-mono text-sm"><span className="text-[#4F46E5]">GET</span> {act.path}</div>
                    {act.status === 'ok' ? <CheckCircle2 className="w-5 h-5 text-[#22C55E]" /> : <XCircle className="w-5 h-5 text-[#EF4444]" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Status Footer */}
          <div className="mt-6 bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm flex gap-8">
            <div className="flex items-center gap-2"><Wifi className="w-5 h-5 text-[#4F46E5]"/> <span className="font-semibold">Live Status</span></div>
            <div className="flex gap-6 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#22C55E]"></div> Connected to Server</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#22C55E]"></div> Redis Status : Connected</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#22C55E]"></div> Socket Status : Connected</span>
            </div>
          </div>

          <footer className="mt-8 text-center text-sm text-[#6B7280]">© 2025 adesGoaurd. All rights reserved.</footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;