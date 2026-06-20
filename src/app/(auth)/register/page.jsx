'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" 
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });
      const data = await response.json();
      
      if (data.insertedId || data.message === "User already exists") {
        router.push("/login");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError("Something went wrong connecting to server.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        
        {error && <p className="text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-sm text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Full Name</label>
            <input type="text" name="name" required onChange={handleChange} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 transition" placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Email Address</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 transition" placeholder="john@example.com" />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Choose Your Role</label>
            <select name="role" onChange={handleChange} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 transition">
              <option value="user">User (Client)</option>
              <option value="lawyer">Lawyer (Legal Expert)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Password</label>
            <input type="password" name="password" required onChange={handleChange} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 transition" placeholder="••••••••" />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Confirm Password</label>
            <input type="password" name="confirmPassword" required onChange={handleChange} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 transition" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-lg text-sm transition mt-6">
            Register Now
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account? <Link href="/login" className="text-emerald-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}