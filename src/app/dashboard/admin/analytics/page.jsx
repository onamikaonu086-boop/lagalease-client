'use client';
import { useEffect, useState } from "react";
import { Users, ShieldCheck, DollarSign, TrendingUp } from "lucide-react";

export default function AnalyticsOverview() {
    const [stats, setStats] = useState({ totalUsers: 0, totalLawyers: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/admin/analytics")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch analytical metrics");
                return res.json();
            })
            .then(data => {
                setStats({
                    totalUsers: data?.totalUsers || 0,
                    totalLawyers: data?.totalLawyers || 0,
                    totalRevenue: data?.totalRevenue || 0
                });
            })
            .catch((err) => {
                console.error("Analytics fetch failure:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-slate-400 text-sm p-6 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-[#00cc88] animate-ping"></div>
                <span>Generating analytics metrics...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl w-full">
            <div>
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                    <span>System Analytics</span>
                </h1>
                <p className="text-xs text-gray-400 mt-1">Real-time business performance metrics and account statistics.</p>
            </div>

            {/* STATS CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* CARD 1: REVENUE */}
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-slate-700">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Gross Revenue</p>
                        <p className="text-3xl font-black text-white tracking-tight">
                            ${Number(stats.totalRevenue).toLocaleString()}
                        </p>
                    </div>
                    <div className="p-3 bg-[#00cc88]/10 text-[#00cc88] rounded-xl border border-[#00cc88]/20 group-hover:scale-105 transition-transform">
                        <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#00cc88] to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

                {/* CARD 2: USERS */}
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-slate-700">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registered Clients</p>
                        <p className="text-3xl font-black text-white tracking-tight">
                            {Number(stats.totalUsers).toLocaleString()}
                        </p>
                    </div>
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 group-hover:scale-105 transition-transform">
                        <Users className="h-5 w-5" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

                {/* CARD 3: LAWYERS */}
                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-slate-700">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Experts</p>
                        <p className="text-3xl font-black text-white tracking-tight">
                            {Number(stats.totalLawyers).toLocaleString()}
                        </p>
                    </div>
                    <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

            </div>
        </div>
    );
}