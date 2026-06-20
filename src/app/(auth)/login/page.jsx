'use client';
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { loginUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.token) {
        const userProfile = { email, name: email.split("@")[0] };
        await loginUser(email, data.token, userProfile);
        router.push("/");
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      setError("Failed to communicate with authentication server.");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {error && <p className="text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 transition" placeholder="john@example.com" />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 transition" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-lg text-sm transition mt-6">
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account yet? <Link href="/register" className="text-emerald-400 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}