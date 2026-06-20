// src/app/page.js
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Scale, Award, Clock } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
  const [featuredLawyers, setFeaturedLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে ডাটা ফেচ করা
  useEffect(() => {
    fetch("http://localhost:5000/lawyers?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedLawyers(data.result || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 pb-20 bg-[#0b0f19] text-white">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
          Your Premium Gateway to Elite{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Legal Assistance
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          Connect with vetted professional lawyers and legal experts online. Secure consultation, transparent pricing, and instant hiring.
        </p>
        <div className="pt-4">
          <Link href="/browse" className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20">
            <span>Find Expert Counsel Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 2. LEGAL CATEGORIES SECTION (এখানে লুপ তুলে সরাসরি স্ট্যাটিক কম্পোনেন্ট বসানো হয়েছে) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-emerald-400 pl-3">Explore Practice Areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition group cursor-pointer">
            <div className="bg-emerald-500/10 p-3 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 transition mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Criminal Law</h3>
            <p className="text-sm text-slate-500">120+ Experts</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition group cursor-pointer">
            <div className="bg-emerald-500/10 p-3 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 transition mb-4">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Corporate & Business</h3>
            <p className="text-sm text-slate-500">85+ Experts</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition group cursor-pointer">
            <div className="bg-emerald-500/10 p-3 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 transition mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Family & Divorce</h3>
            <p className="text-sm text-slate-500">94+ Experts</p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition group cursor-pointer">
            <div className="bg-emerald-500/10 p-3 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 transition mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Civil Litigation</h3>
            <p className="text-sm text-slate-500">150+ Experts</p>
          </div>

        </div>
      </section>

      {/* 3. FEATURED LAWYERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold border-l-4 border-emerald-400 pl-3">Top Rated Specialists</h2>
          <Link href="/browse" className="text-emerald-400 text-sm hover:underline flex items-center space-x-1">
            <span>See all lawyers</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : featuredLawyers.length === 0 ? (
          <p className="text-slate-500 text-center py-10 bg-[#0f172a] rounded-2xl border border-slate-800">No premium lawyers available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLawyers.map((lawyer) => (
              <div key={lawyer._id} className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition flex flex-col">
                <div className="p-6 space-y-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/20">
                      {lawyer.specialization}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${lawyer.status === 'Available' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {lawyer.status || 'Available'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{lawyer.name}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{lawyer.bio}</p>
                  </div>
                  <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-sm">
                    <span className="text-slate-500">Hourly Rate</span>
                    <span className="text-white font-bold text-lg">${lawyer.fee} / hr</span>
                  </div>
                </div>
                <div className="p-6 bg-slate-900/50 border-t border-slate-800">
                  <Link href={`/lawyer/${lawyer._id}`} className="block text-center w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-xl text-sm transition">
                    View Legal Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}