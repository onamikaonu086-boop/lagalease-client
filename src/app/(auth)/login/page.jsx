'use client';
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const { login, loginUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");

    login(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setError(err.message || "Invalid email or password.");
      });
  };

  const googleLoginTrigger = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError("");
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await userInfoRes.json();

        const backendRes = await fetch('https://legalease-server-neon.vercel.app/jwt', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: googleUser.name,
            email: googleUser.email,
            image: googleUser.picture
          })
        });

        const backendData = await backendRes.json();

        if (backendData.token) {
          await loginUser(googleUser.email, backendData.token, {
            name: googleUser.name,
            email: googleUser.email,
            image: googleUser.picture
          });
          router.push("/");
        } else {
          setError("Backend authentication failed.");
        }
      } catch (err) {
        setError("Google login process failed.");
      }
    },
    onError: () => setError("Google Sign-In failed."),
  });

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

        {/* Social Login Button */}
        <button
          type="button"
          onClick={() => googleLoginTrigger()} 
          className="w-full bg-[#0b0f19] hover:bg-slate-800 border border-slate-800 text-white font-medium text-xs py-3 rounded-xl transition flex items-center justify-center space-x-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.315 1.886-2.135 5.542-6.887 5.542-4.09 0-7.43-3.39-7.43-7.57s3.34-7.57 7.43-7.57c2.33 0 3.89.97 4.78 1.83l3.22-3.11C18.16 1.57 15.42 1 12.24 1 6.05 1 1 6.05 1 12.24s5.05 11.24 11.24 11.24c6.47 0 10.78-4.55 10.78-10.97 0-.74-.08-1.3-.18-1.83H12.24z"
            />
          </svg>
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
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition"
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
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition"
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