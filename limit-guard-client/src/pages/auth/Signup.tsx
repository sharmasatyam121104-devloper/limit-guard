import Logo from '../../components/common/Logo';
import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Database,
  Lock, 
  Mail,
  UserPlus,
  KeyRound,
  Rocket
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import httpRequest from '../../utils/httpRequest';
import clientCatchError from '../../utils/clientCatchError';

const Signup: React.FC = () => {

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSignup = async(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputData = Object.fromEntries(formData.entries());

    if(!inputData.email || !inputData.password || !inputData.fullname) return toast.error("Please fill in all the fields.");

    try {
      setLoading(true);
      const {data} = await httpRequest.post("/user/signup", inputData);
      
      toast.success(data.message);
      navigate("/login");
    } 
    catch (error) {
      return clientCatchError(error);  
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Side: Onboarding/Benefits Focus */}
        <div className="bg-[#4F46E5] text-white p-12 flex flex-col justify-center w-full md:w-5/12">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold mb-6 leading-tight">Start Limiting Today</h1>
          <p className="mb-10 text-indigo-100">
            Join thousands of developers. Create your LimitGuard account and 
            take full control of your API request throttling in minutes.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-700 rounded-lg"><UserPlus size={20} /></div>
              <div>
                <h3 className="font-semibold">Quick Onboarding</h3>
                <p className="text-sm text-indigo-100">Get your workspace ready in under 60 seconds.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-700 rounded-lg"><KeyRound size={20} /></div>
              <div>
                <h3 className="font-semibold">API Key Generation</h3>
                <p className="text-sm text-indigo-100">Instantly generate secure tokens for your services.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-700 rounded-lg"><Rocket size={20} /></div>
              <div>
                <h3 className="font-semibold">Scale Limitless</h3>
                <p className="text-sm text-indigo-100">Start small and scale your limits as you grow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="p-12 w-full md:w-7/12 flex flex-col justify-center">
          <div className="flex justify-end mb-8 text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="ml-1 text-[#4F46E5] hover:underline font-semibold">Login</Link>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-gray-900">Create Account</h2>
          <p className="text-gray-500 mb-8">Join LimitGuard and protect your APIs</p>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input name='fullname' type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input name='email' type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input name='password' type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-[#4F46E5] text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition mt-4">
              {loading ? "Loading..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-6 text-center text-gray-400 text-sm">
            <span className="bg-white px-2">or</span>
            <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 -z-10"></div>
          </div>

          <button disabled={loading} className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle size={24}/>
            <span>Sign up with Google</span>
          </button>

          <div className="flex justify-between mt-12 text-center text-gray-600 gap-4">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={24} className="text-indigo-600" />
              <p className="text-xs font-bold">Privacy</p>
              <p className="text-[10px] text-gray-400 leading-tight px-1">Your data is yours</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap size={24} className="text-indigo-600" />
              <p className="text-xs font-bold">Ready</p>
              <p className="text-[10px] text-gray-400 leading-tight px-1">Instant activation</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Database size={24} className="text-indigo-600" />
              <p className="text-xs font-bold">Scaling</p>
              <p className="text-[10px] text-gray-400 leading-tight px-1">Growth ready</p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">© 2026 LimitGuard. All rights reserved.</p>
    </div>
  );
};

export default Signup;