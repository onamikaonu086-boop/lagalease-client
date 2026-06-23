'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function MyComments() {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/reviews/user/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setComments(data);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            const res = await fetch(`http://localhost:5000/reviews/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.deletedCount > 0) {
                toast.success("Comment deleted successfully!");
                setComments(comments.filter(c => c._id !== id));
            }
        } catch (error) {
            toast.error("Failed to delete comment");
        }
    };

    if (loading) return <div className="text-gray-400 text-sm">Loading your comments...</div>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">My Comments & Reviews</h1>
                <p className="text-xs text-gray-400 mt-1">Manage all the feedbacks you have left for law experts.</p>
            </div>

            {comments.length === 0 ? (
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center text-gray-400">
                    You haven't left any comments yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comments.map((c) => (
                        <div key={c._id} className="bg-[#111827] border border-gray-800 rounded-xl p-5 flex flex-col justify-between shadow-lg">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-white text-sm">Review for Lawyer</h4>
                                    <span className="text-xs bg-[#00cc88]/10 text-[#00cc88] px-2 py-0.5 rounded border border-[#00cc88]/20">
                                        ⭐ {c.rating}/5
                                    </span>
                                </div>
                                <p className="text-gray-300 text-sm italic">"{c.comment}"</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-800/60 flex justify-between items-center">
                                <span className="text-xs text-gray-500">{c.date}</span>
                                <button 
                                    onClick={() => handleDelete(c._id)}
                                    className="text-xs text-red-400 hover:text-red-300 font-medium transition-all"
                                >
                                    Delete Feedback
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}