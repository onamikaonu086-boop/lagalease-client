'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { Shield, DollarSign, Activity, Save } from "lucide-react";

export default function ManageLegalProfile() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [bio, setBio] = useState("");
    const [fee, setFee] = useState("");
    const [status, setStatus] = useState("Available");

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`https://legalease-server-neon.vercel.app/lawyer/profile/${user.email}`)
            .then((res) => {
                if (!res.ok) throw new Error("Profile not found");
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setBio(data.bio || "");
                    setFee(data.fee || "");
                    setStatus(data.status || "Available");
                }
            })
            .catch((err) => {
                console.error("Error loading lawyer profile:", err);
            })
            .finally(() => setLoading(false));
    }, [user?.email]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!user?.email) return toast.error("User session not found.");
        
        setUpdating(true);

        const updatedProfile = { 
            bio, 
            fee: Number(fee), 
            status 
        };

        try {
            const res = await fetch(`https://legalease-server-neon.vercel.app/lawyer/update/${user?.email}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfile)
            });
            const data = await res.json();

            if (data.success || data.acknowledged || data.modifiedCount > 0) {
                toast.success("Legal credentials updated successfully!");
            } else if (data.matchedCount === 1 && data.modifiedCount === 0) {
                toast.error("No changes were made to your profile.");
            } else {
                toast.error(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Sync error:", error);
            toast.error("Failed to sync profile with server.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-slate-400 text-sm animate-pulse p-6">
                <div className="w-2 h-2 rounded-full bg-[#00cc88] animate-ping"></div>
                <span>Loading workspace configurations...</span>
            </div>
        );
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-emerald-400" />
                    <span>Manage Legal Profile</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">Configure your professional bio, hourly rates, and live availability for clients.</p>
            </div>

            <form onSubmit={handleUpdateProfile} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                {/* 1. BIOGRAPHY */}
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Professional Biography</label>
                    <textarea
                        required
                        rows={6}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="State your credentials, core expertises, and years of legal practice..."
                        className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition resize-none leading-relaxed"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* 2. HOURLY FEE */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center space-x-1">
                            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Consultation Fee ($/hr)</span>
                        </label>
                        <input
                            required
                            type="number"
                            min="1"
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                            placeholder="e.g. 150"
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                        />
                    </div>

                    {/* 3. AVAILABILITY STATUS */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center space-x-1">
                            <Activity className="h-3.5 w-3.5 text-cyan-400" />
                            <span>Availability Status</span>
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition cursor-pointer"
                        >
                            <option value="Available" className="bg-[#0f172a] text-cyan-400">🟢 Available</option>
                            <option value="Busy" className="bg-[#0f172a] text-amber-400">🟡 Busy / Fully Booked</option>
                        </select>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-900 disabled:text-slate-600 disabled:border disabled:border-slate-800 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/10"
                >
                    <Save className="h-4 w-4" />
                    <span>{updating ? "Syncing Credentials..." : "Save Professional Profile"}</span>
                </button>

            </form>
        </div>
    );
}