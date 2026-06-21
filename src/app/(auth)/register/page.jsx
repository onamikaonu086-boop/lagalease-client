'use client';
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Image, ArrowRight } from "lucide-react";

export default function Register() {
  const { createUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photo.value;

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await createUser(name, email, password, photoURL);
      router.push("/"); 
    } catch (err) {
      setError(err.message || "Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-black tracking-tight">Create Elite Account</h1>
          <p className="text-xs text-slate-400">Join LegalEase premium corporate network today</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Full Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 h-4 w-4 text-slate-500" />
              <input required type="text" name="name" placeholder="John Doe" className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-4 w-4 text-slate-500" />
              <input required type="email" name="email" placeholder="name@company.com" className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Profile Image URL</label>
            <div className="relative flex items-center">
              <Image className="absolute left-3 h-4 w-4 text-slate-500" />
              <input required type="url" name="photo" placeholder="https://image-link.com" className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-slate-500" />
              <input required type="password" name="password" placeholder="••••••••" className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{loading ? "Registering..." : "Sign Up Account"}</span>
            {!loading && <ArrowRight className="h-3 w-3" />}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}