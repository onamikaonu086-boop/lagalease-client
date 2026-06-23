'use client';
import { useEffect, useState } from "react";
import { Users, ShieldAlert, DollarSign, TrendingUp } from "lucide-react";

export default function AnalyticsOverview() {
    const [stats, setStats] = useState({ totalUsers: 0, totalLawyers: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/admin/analytics")
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-gray-400 text-sm">Generating analytics metrics...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white">System Analytics</h1>
                <p className="text-xs text-gray-400 mt-1">Real-time business performance metrics and account statistics.</p>
            </div>

            {/* STATS CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* CARD 1: REVENUE */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 flex items-center justify-between shadow-xl relative overflow-hidden group">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Gross Revenue</p>
                        <p className="text-3xl font-black text-white">${stats.totalRevenue}</p>
                    </div>
                    <div className="p-3 bg-[#00cc88]/10 text-[#00cc88] rounded-xl border border-[#00cc88]/20">
                        <DollarSign className="h-6 w-6" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#00cc88] to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>

                {/* CARD 2: USERS */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 flex items-center justify-between shadow-xl relative overflow-hidden group">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Registered Clients</p>
                        <p className="text-3xl font-black text-white">{stats.totalUsers}</p>
                    </div>
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                        <Users className="h-6 w-6" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>

                {/* CARD 3: LAWYERS */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 flex items-center justify-between shadow-xl relative overflow-hidden group">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verified Experts</p>
                        <p className="text-3xl font-black text-white">{stats.totalLawyers}</p>
                    </div>
                    <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>

            </div>
        </div>
    );
}