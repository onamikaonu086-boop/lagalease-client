'use client';
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Chrome } from "lucide-react";

export default function Login() {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");

    signInUser(email, password)
      .then(() => {
        router.push("/"); 
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
      });
  };


  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setError("Google sign-in failed.");
      });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-black tracking-tight">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to your premium legal dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        {/* Social Login */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-[#0b0f19] hover:bg-slate-800 border border-slate-800 text-white font-medium text-xs py-3 rounded-xl transition flex items-center justify-center space-x-2"
        >
          <Chrome className="h-4 w-4 text-emerald-400" />
          <span>Continue with Google</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-2 text-slate-500 font-medium">Or email sign in</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-4 w-4 text-slate-500" />
              <input 
                required 
                type="email" 
                name="email" 
                placeholder="name@company.com" 
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs text-slate-400 font-medium">Password</label>
              <button type="button" className="text-[10px] text-emerald-400 hover:underline">Forgot?</button>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-slate-500" />
              <input 
                required 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/10"
          >
            <span>Access Dashboard</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-emerald-400 hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}