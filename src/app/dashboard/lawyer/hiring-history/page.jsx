'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function LawyerHiringRequests() {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // ১. ব্যাকএন্ড থেকে লয়ারের নির্দিষ্ট রিকোয়েস্টগুলো লোড করা
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/lawyer/hiring-requests/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRequests(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/hiring-status/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            
            if (data.modifiedCount > 0) {
                toast.success(`Request ${newStatus} successfully!`);
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

    if (loading) return <div className="text-gray-400 text-sm">Loading incoming requests...</div>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Client Hiring Requests</h1>
                <p className="text-xs text-gray-400 mt-1">Review, accept, or decline ongoing consultation requests from clients.</p>
            </div>

            {requests.length === 0 ? (
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center text-gray-400">
                    No hiring requests received yet.
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#111827] border border-gray-800 rounded-xl shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <th className="p-4">Client Name</th>
                                <th className="p-4">Client Email</th>
                                <th className="p-4">Requested Date</th>
                                <th className="p-4">Offered Fee</th>
                                <th className="p-4">Current Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                            {requests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-800/30 transition-all">
                                    <td className="p-4 font-medium text-white">{req.clientName}</td>
                                    <td className="p-4">{req.clientEmail}</td>
                                    <td className="p-4">{req.date}</td>
                                    <td className="p-4">${req.fee}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                            req.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            req.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center flex items-center justify-center space-x-2">
                                        {req.status === 'pending' ? (
                                            <>
                                                <button 
                                                    onClick={() => handleStatusUpdate(req._id, 'accepted')}
                                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded transition-all"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(req._id, 'rejected')}
                                                    className="bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/40 text-xs px-3 py-1.5 rounded transition-all"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-500 italic uppercase tracking-wider">
                                                Action Taken
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