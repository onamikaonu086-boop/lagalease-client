import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";

export default function FeaturedLawyers({ lawyers, loading }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-xl font-black uppercase tracking-wider text-slate-400 border-l-4 border-emerald-400 pl-3 text-xs">Top Rated Specialists</h2>
        <Link href="/browse" className="text-emerald-400 text-xs font-bold hover:underline flex items-center space-x-1">
          <span>See all lawyers</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : lawyers.length === 0 ? (
        <div className="text-slate-500 text-center py-12 bg-[#0f172a] rounded-2xl border border-slate-800 text-xs font-medium">
          No premium lawyers available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div key={lawyer._id} className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700/60 transition flex flex-col">
              <div className="p-6 space-y-4 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold uppercase border border-emerald-500/20">
                    {lawyer.specialization}
                  </span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border ${lawyer.status === 'Available' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                    {lawyer.status || 'Available'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{lawyer.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{lawyer.bio}</p>
                </div>
                <div className="border-t border-slate-800/60 pt-4 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Hourly Rate</span>
                  <span className="text-white font-black text-base">${lawyer.fee} / hr</span>
                </div>
              </div>
              <div className="p-4 bg-slate-900/40 border-t border-slate-800/60">
                <Link href={`/lawyer/${lawyer._id}`} className="block text-center w-full bg-slate-800/60 hover:bg-slate-700 border border-slate-700/40 text-white font-semibold py-2.5 rounded-xl text-xs transition">
                  View Legal Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}