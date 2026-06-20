// src/components/Footer.js
'use client';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-slate-800 text-slate-400 text-sm py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-white font-bold text-lg mb-3">LegalEase</h3>
          <p className="text-slate-400 leading-relaxed">
            Democratizing access to high-end digital legal assistance. Find and hire professional legal counsel seamlessly.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-emerald-400 transition">About Us</Link></li>
            <li><Link href="/browse" className="hover:text-emerald-400 transition">Contact Counsel</Link></li>
            <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Subscribe to Newsletter</h4>
          <p className="mb-3 text-slate-400">Stay updated with legal news and expert listings.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-400 text-sm flex-grow"
            />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium px-4 py-1.5 rounded-lg text-sm transition">
              Join
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LegalEase. All rights reserved. Premium Digital Law Firm Experience.
      </div>
    </footer>
  );
}