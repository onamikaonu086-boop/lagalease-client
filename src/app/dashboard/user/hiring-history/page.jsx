'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function UserHiringHistory() {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/user/hiring-history/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setHistory(data);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <div className="text-gray-400 text-sm">Loading hiring history...</div>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Hiring History</h1>
                <p className="text-xs text-gray-400 mt-1">Track your consultation statuses and payments here.</p>
            </div>

            {history.length === 0 ? (
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center text-gray-400">
                    No hiring records found. Go to browse lawyers to hire counsel!
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#111827] border border-gray-800 rounded-xl shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <th className="p-4">Lawyer Name</th>
                                <th className="p-4">Specialization</th>
                                <th className="p-4">Fee</th>
                                <th className="p-4">Date Requested</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                            {history.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-800/30 transition-all">
                                    <td className="p-4 font-medium text-white">{item.lawyerName}</td>
                                    <td className="p-4">{item.specialization}</td>
                                    <td className="p-4">${item.fee}</td>
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                            item.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            item.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {item.status === 'accepted' ? (
                                            <button className="bg-[#00cc88] text-black font-semibold text-xs px-4 py-1.5 rounded hover:bg-[#00b377] transition-all shadow">
                                                Pay Fee
                                            </button>
                                        ) : (
                                            <button disabled className="bg-gray-800 text-gray-500 text-xs px-4 py-1.5 rounded cursor-not-allowed">
                                                {item.status === 'pending' ? 'Awaiting Accept' : 'Rejected'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}