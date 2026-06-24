'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { MessageSquare, Trash2, Calendar, Shield } from "lucide-react";

export default function MyComments() {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`https://legalease-server-neon.vercel.app/reviews/user/${user.email}`)
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setComments(data);
                } else if (data && Array.isArray(data.reviews)) {
                    setComments(data.reviews); 
                } else {
                    setComments([]); 
                }
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setComments([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.email]);

    const handleDeleteComment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this insight?")) return;

        try {
            const res = await fetch(`https://legalease-server-neon.vercel.app/reviews/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.deletedCount > 0) {
                toast.success("Review deleted successfully.");
                setComments(prev => prev.filter(c => c._id !== id));
            } else {
                toast.error("Review already deleted or not found.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete review.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-slate-400 text-sm animate-pulse p-4">
                <div className="w-4 h-4 rounded-full bg-slate-700 animate-bounce"></div>
                <span>Loading user feedback records...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6 text-emerald-400" />
                    <span>My Feedback & Insights</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Manage and audit all testimonials and professional reviews submitted by your account.
                </p>
            </div>

            {!comments || comments.length === 0 ? (
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
                    No active reviews or feedbacks submitted by this profile.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comments?.map((c) => (
                        <div key={c._id} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl space-y-4 hover:border-slate-700/60 transition-all">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
                                        <span>⭐ {c.rating || 5}.0</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono flex items-center bg-[#0b0f19] px-2 py-0.5 rounded-md border border-slate-800/80">
                                        <Calendar className="h-3 w-3 mr-1 text-slate-600" /> {c.date || "Recent"}
                                    </span>
                                </div>
                                
                                {c.lawyerName && (
                                    <p className="text-xs text-slate-400 font-medium flex items-center">
                                        <Shield className="h-3 w-3 mr-1 text-emerald-400" /> To: {c.lawyerName}
                                    </p>
                                )}

                                <p className="text-xs text-slate-300 leading-relaxed italic pt-1">
                                    "{c.comment}"
                                </p>
                            </div>

                            <div className="pt-2 border-t border-slate-800/40 flex justify-end">
                                <button
                                    onClick={() => handleDeleteComment(c._id)}
                                    className="text-rose-400 hover:text-white hover:bg-rose-600/20 p-2 rounded-xl transition border border-transparent hover:border-rose-500/10 text-xs font-semibold flex items-center space-x-1.5"
                                    title="Delete Review"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}