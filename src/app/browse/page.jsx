'use client';
import { useEffect, useState } from "react";
import { Search, Filter, Shield, Scale, Award, Clock } from "lucide-react";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";

export default function BrowseLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");


  useEffect(() => {
    setLoading(true);
   
    let url = `http://localhost:5000/lawyers?`;
    if (searchText) url += `search=${searchText}&`;
    if (selectedSpecialization) url += `specialization=${selectedSpecialization}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLawyers(data.result || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchText, selectedSpecialization]); 

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* PAGE HEADER */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight border-l-4 border-emerald-400 pl-3">
            Find Premium Legal Counsel
          </h1>
          <p className="text-slate-400 text-sm">
            Browse through our vetted elite specialists and secure instant consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0f172a] p-4 rounded-2xl border border-slate-800">
          
          {/* Search Input */}
          <div className="md:col-span-2 relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search lawyers by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="relative flex items-center">
            <Filter className="absolute left-4 h-5 w-5 text-slate-500" />
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition appearance-none cursor-pointer"
            >
              <option value="">All Practice Areas</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Corporate & Business">Corporate & Business</option>
              <option value="Family & Divorce">Family & Divorce</option>
              <option value="Civil Litigation">Civil Litigation</option>
            </select>
          </div>

        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : lawyers.length === 0 ? (
          <div className="text-center py-20 bg-[#0f172a] rounded-2xl border border-slate-800 space-y-2">
            <p className="text-slate-400 font-medium">No legal specialists found matching your criteria.</p>
            <p className="text-xs text-slate-600">Try adjusting your keywords or clearing filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => (
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

      </div>
    </div>
  );
}