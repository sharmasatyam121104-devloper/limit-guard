
import Logo from '../../components/common/Logo';

import React from 'react';

import { 
  ShieldCheck, 
  Zap, 
  Database, 
  Terminal, 
  Lock, 
  Mail,
  CheckCircle2,
  PlaySquare,
  ShieldUser
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import clientCatchError from '../../utils/clientCatchError';
import httpRequest from '../../utils/httpRequest';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {setUser} = useAuthStore();
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputData = Object.fromEntries(formData.entries());
    
    if(!inputData.email || !inputData.password) return toast.error("Please fill in all the fields.");

    try {
      setLoading(true);
      const {data} = await httpRequest.post("/user/login", inputData);
    
      toast.success(data.message);
      setUser(data.userData);
      navigate("/");
    } 
    catch (error) {
      return clientCatchError(error);  
    }
    finally {
      setLoading(false);
    }

  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Side: Playground/Testing Focus */}
        <div className="bg-[#4F46E5] text-white p-12 flex flex-col justify-center w-full md:w-5/12">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold mb-6 leading-tight">Master Your API Traffic</h1>
          <p className="mb-10 text-indigo-100">
            Login to access the LimitGuard playground. Test your endpoints against 
            custom rate limits and analyze real-time request behavior.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-700 rounded-lg"><PlaySquare size={20} /></div>
              <div>
                <h3 className="font-semibold">Interactive Playground</h3>
                <p className="text-sm text-indigo-100">Hit your APIs directly and see rate limits in action.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-700 rounded-lg"><Database size={20} /></div>
              <div>
                <h3 className="font-semibold">Live Request Stats</h3>
                <p className="text-sm text-indigo-100">Monitor remaining requests and throttle patterns instantly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-700 rounded-lg"><Terminal size={20} /></div>
              <div>
                <h3 className="font-semibold">Admin Insights</h3>
                <p className="text-sm text-indigo-100">Track global leaderboards and system-wide event logs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-12 w-full md:w-7/12 flex flex-col justify-center">
          <div className="flex justify-end mb-8 text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/signup" className="ml-1 text-[#4F46E5] hover:underline font-semibold">Sign up</a>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Login to your adesGoaurd account</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input type="email" name="email" placeholder="Enter your email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input name="password" type="password" placeholder="Enter your password" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
              </div>
            </div>

            <button disabled={loading} className="w-full flex justify-center items-center gap-1 bg-[#4F46E5] text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">
              <ShieldUser/>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="relative my-6 text-center text-gray-400 text-sm">
            <span className="bg-white px-2">or</span>
            <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 -z-10"></div>
          </div>

          <button disabled={loading} className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle size={24}/>
            <span>Continue with Google</span>
          </button>

          <div className="flex justify-between mt-12 text-center text-gray-600 gap-4">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={24} className="text-indigo-600" />
              <p className="text-xs font-bold">Secure</p>
              <p className="text-[10px] text-gray-400 leading-tight px-1">Redis-backed thread safety</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap size={24} className="text-indigo-600" />
              <p className="text-xs font-bold">Fast</p>
              <p className="text-[10px] text-gray-400 leading-tight px-1">Microsecond response time</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckCircle2 size={24} className="text-indigo-600" />
              <p className="text-xs font-bold">Reliable</p>
              <p className="text-[10px] text-gray-400 leading-tight px-1">Atomic request limiting</p>
            </div>
          </div>
        </div>

      </div>
      
      <p className="mt-8 text-sm text-gray-500">© 2026 LimitGuard. All rights reserved.</p>
    </div>
  );
};

export default Login;