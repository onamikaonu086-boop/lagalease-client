'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { Check, X, Clock, Banknote, UserCheck } from "lucide-react";

export default function LawyerHiringRequests() {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`http://localhost:5000/lawyer/hiring-requests/${user.email}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then(data => {
                setRequests(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Error fetching hiring requests:", err);
                toast.error("Could not load incoming requests.");
            })
            .finally(() => setLoading(false));
            
    }, [user?.email]); 

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/hiring-status/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            
            if (data.modifiedCount > 0) {
                toast.success(`Request marked as ${newStatus}!`);
                setRequests(prevRequests => 
                    prevRequests.map(req => 
                        req._id === id ? { ...req, status: newStatus } : req
                    )
                );
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-slate-400 text-sm p-6 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-[#00cc88] animate-ping"></div>
                <span>Loading incoming client requests...</span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <UserCheck className="h-6 w-6 text-emerald-400" />
                    <span>Client Hiring Requests</span>
                </h1>
                <p className="text-xs text-gray-400 mt-1">Review, accept, or decline ongoing consultation requests from clients.</p>
            </div>

            {requests.length === 0 ? (
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-10 text-center text-gray-500 text-sm max-w-xl">
                    <Clock className="h-8 w-8 mx-auto text-gray-600 mb-2" />
                    No hiring requests received yet.
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#0f172a] border border-slate-800/80 rounded-2xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th className="p-4">Client Details</th>
                                <th className="p-4">Requested Date</th>
                                <th className="p-4">Offered Fee</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                            {requests.map((req) => (
                                <tr key={req._id} className="hover:bg-slate-800/20 transition-all group">
                                    <td className="p-4">
                                        <div className="font-semibold text-white text-sm">{req.clientName}</div>
                                        <div className="text-gray-500 font-mono mt-0.5">{req.clientEmail}</div>
                                    </td>
                                    <td className="p-4 font-mono text-gray-400">{req.date || "N/A"}</td>
                                    <td className="p-4">
                                        <span className="font-bold text-emerald-400 text-sm">${req.fee}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border tracking-wider ${
                                            req.status === 'pending' ? 'bg-amber-500/5 text-amber-400 border-amber-500/20' :
                                            req.status === 'accepted' ? 'bg-indigo-500/5 text-indigo-400 border-indigo-500/20' :
                                            req.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                            'bg-rose-500/5 text-rose-400 border-rose-500/20'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {req.status === 'pending' ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <button 
                                                    onClick={() => handleStatusUpdate(req._id, 'accepted')}
                                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl transition-all shadow-lg shadow-emerald-950/20 flex items-center space-x-1"
                                                >
                                                    <Check className="h-3 w-3" />
                                                    <span>Accept</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(req._id, 'rejected')}
                                                    className="bg-slate-900 hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/30 font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1"
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span>Reject</span>
                                                </button>
                                            </div>
                                        ) : req.status === 'paid' ? (
                                            <div className="text-emerald-400 font-bold flex items-center justify-center space-x-1 text-[11px] uppercase tracking-wider bg-emerald-500/5 py-1 px-3 rounded-lg border border-emerald-500/10 w-fit mx-auto">
                                                <Banknote className="h-3.5 w-3.5" />
                                                <span>Payment Cleared</span>
                                            </div>
                                        ) : (
                                            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider italic">
                                                Processed
                                            </span>
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