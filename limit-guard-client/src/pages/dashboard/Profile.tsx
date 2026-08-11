import { useState } from "react";
import {  Mail, Shield, Camera, Edit2, Save } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import clientCatchError from "../../utils/clientCatchError";
import httpRequest from "../../utils/httpRequest";

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fullname, setFullname] = useState(user?.fullname ?? "");
  const [loading, setLoading] = useState(false);

  const handleSave = async() => {
    setIsEditing(false);
    if(fullname === user?.fullname) {
      return toast.error("No changes detected.");
    }

    try {
      setLoading(true);
      const { data } = await httpRequest.put("/user/update-profile", { fullname });
      toast.success(data.message);
      setUser({
        fullname,
      });
    } catch (error) {
      clientCatchError(error);
    }
    finally{
      setLoading(false);
      setIsEditing(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      {/* Container with constrained width for better focus */}
      <div className="max-w-2xl mx-auto">
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-sm text-gray-500">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition text-sm font-semibold shadow-sm"
            >
              <Edit2 size={16} /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">Cancel</button>
              <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm font-semibold shadow-md shadow-indigo-200">
                <Save size={16} /> {loading ? "Changes Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative group mb-4">
              <div className="h-28 w-28 rounded-full bg-linear-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-indigo-200">
                {fullname?.charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <button onClick={() => {toast.info("Feature coming soon...");}} className="absolute bottom-0 right-0 p-3 bg-white border border-gray-200 rounded-full shadow-lg text-gray-600 hover:scale-105 transition">
                  <Camera size={18} />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 capitalize">{fullname}</h2>
            <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              {user?.role}
            </span>
          </div>

          {/* Details Section */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border ${isEditing ? "border-indigo-300 ring-4 ring-indigo-50" : "border-gray-200 bg-gray-50 capitalize"} transition-all outline-none`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600">
                  <Mail size={18} className="text-gray-400" /> 
                  <span className="text-sm font-medium">{user?.email}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Auth Provider</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600">
                  <Shield size={18} className="text-gray-400" /> 
                  <span className="text-sm font-medium capitalize">{user?.auth_provider}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;