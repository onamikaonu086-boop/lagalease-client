'use client';
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import Link from "next/link";
import { Menu, X, Search, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const role = "Client"; 

  return (
    <nav className="bg-[#0f172a] border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              LegalEase
            </Link>
          </div>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search lawyers by name or specialization..."
                className="w-full bg-[#1e293b] text-slate-200 pl-10 pr-4 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-400 text-sm transition"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* NAVIGATION LINKS (DESKTOP) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-300 hover:text-emerald-400 text-sm font-medium transition">Home</Link>
            <Link href="/browse" className="text-slate-300 hover:text-emerald-400 text-sm font-medium transition">Browse Lawyers</Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-slate-300 hover:text-emerald-400 text-sm font-medium transition capitalize">
                  Dashboard ({role})
                </Link>
                {user.photoURL && (
                  <img src={user.photoURL} alt="Profile" className="h-7 w-7 rounded-full object-cover border border-emerald-500/30" />
                )}
                <button onClick={logout} className="flex items-center space-x-1 bg-rose-600/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-rose-600 hover:text-white transition">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-emerald-500 text-slate-950 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-400 transition">
                Login
              </Link>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-slate-800 px-2 pt-2 pb-4 space-y-1">
          <Link href="/" className="block text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link href="/browse" className="block text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium">Browse Lawyers</Link>
          
          <div className="px-3 py-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1e293b] text-slate-200 pl-10 pr-4 py-2 rounded-lg border border-slate-700 text-sm"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {user ? (
            <>
              <Link href="/dashboard" className="block text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium capitalize">
                Dashboard ({role})
              </Link>
              <button onClick={logout} className="w-full flex items-center space-x-2 bg-rose-600/20 text-rose-400 px-3 py-2 rounded-md text-base font-medium">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link href="/login" className="block text-center bg-emerald-500 text-slate-950 px-3 py-2 rounded-md text-base font-medium">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}