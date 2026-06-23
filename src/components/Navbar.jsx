'use client';
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import Link from "next/link";
import { Menu, X, Search, LogOut, LayoutDashboard, User } from "lucide-react";

export default function Navbar() {
  const { user, logout, role } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);

  const getDisplayRole = (currentRole) => {
    if (currentRole === 'admin') return 'Admin';
    if (currentRole === 'lawyer') return 'Lawyer';
    return 'Client';
  };

  return (
    <nav className="bg-[#0f172a]/80 border-b border-slate-800/60 sticky top-0 z-50 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition">
              LegalEase
            </Link>
          </div>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search lawyers by name or specialization..."
                className="w-full bg-[#0b0f19] text-slate-200 pl-10 pr-4 py-1.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500/50 text-xs transition duration-300 placeholder-slate-600 focus:ring-1 focus:ring-emerald-500/10"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-slate-600 group-focus-within:text-emerald-400 transition" />
            </div>
          </div>

          {/* NAVIGATION LINKS (DESKTOP) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-400 hover:text-white text-xs font-semibold tracking-wide transition">Home</Link>
            <Link href="/browse" className="text-slate-400 hover:text-white text-xs font-semibold tracking-wide transition">Browse Lawyers</Link>
            
            {user ? (
              <div className="flex items-center space-x-4 border-l border-slate-800/80 pl-4">
                
                {/* DYNAMIC DASHBOARD ROUTE WITH FORMATTED ROLE */}
                <Link href="/dashboard" className="flex items-center space-x-1.5 text-slate-400 hover:text-emerald-400 text-xs font-semibold tracking-wide transition capitalize">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>Dashboard <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md font-bold ml-1 uppercase">{getDisplayRole(role)}</span></span>
                </Link>

                {/* PREMIUM AVATAR */}
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center overflow-hidden shadow-inner">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-emerald-400" />
                  )}
                </div>

                {/* LOGOUT BUTTON */}
                <button onClick={logout} className="flex items-center space-x-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition shadow-sm">
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition shadow-lg shadow-emerald-500/10">
                Login
              </Link>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white focus:outline-none p-1 bg-slate-900/50 rounded-lg border border-slate-800">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-slate-800 px-4 pt-2 pb-5 space-y-3 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-slate-400 hover:text-white py-2 rounded-md text-sm font-semibold">Home</Link>
          <Link href="/browse" onClick={() => setIsOpen(false)} className="block text-slate-400 hover:text-white py-2 rounded-md text-sm font-semibold">Browse Lawyers</Link>
          
          <div className="py-1">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#0b0f19] text-slate-200 pl-10 pr-4 py-2 rounded-xl border border-slate-800 text-xs"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
            </div>
          </div>

          {user ? (
            <div className="pt-2 border-t border-slate-800/80 space-y-3">
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 py-2 text-sm font-semibold capitalize">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard ({getDisplayRole(role)})</span>
              </Link>
              <button onClick={() => { logout(); setIsOpen(false); }} className="w-full flex items-center justify-center space-x-2 bg-rose-500/10 text-rose-400 py-2.5 rounded-xl text-xs font-bold border border-rose-500/10">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="block text-center bg-emerald-500 text-slate-950 py-2.5 rounded-xl text-xs font-bold shadow-lg">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}