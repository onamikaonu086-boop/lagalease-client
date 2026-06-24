'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { User, Mail, Camera, Save } from "lucide-react";

export default function UpdateUserProfile() {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName || user.name || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const res = await fetch(`http://localhost:5000/users/update/${user?.email}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, photoURL })
            });
            const data = await res.json();

            if (data.success || res.ok) {
                toast.success("Profile synchronized successfully!");
            } else {
                toast.error("Failed to update profile configurations.");
            }
        } catch (error) {
            toast.error("Network synchronization failed.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-md">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                    <User className="h-6 w-6 text-emerald-400" />
                    <span>Account Settings</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">Update your personal identity identity specifications and avatar link.</p>
            </div>

            <form onSubmit={handleUpdate} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
                
                {/* AVATAR PREVIEW */}
                <div className="flex items-center space-x-4 bg-[#0b0f19] p-4 rounded-xl border border-slate-800/60">
                    <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                        {photoURL ? (
                            <img src={photoURL} alt="Avatar Preview" className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-6 w-6 text-slate-500" />
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">Profile Avatar</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Live configuration response preview.</p>
                    </div>
                </div>

                {/* 1. NAME */}
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your elegant name"
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                        />
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-600" />
                    </div>
                </div>

                {/* 2. EMAIL (READ ONLY) */}
                <div className="space-y-1.5 opacity-60">
                    <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Address (Immutable)</label>
                    <div className="relative">
                        <input
                            disabled
                            type="email"
                            value={user?.email || ""}
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-400 cursor-not-allowed"
                        />
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-700" />
                    </div>
                </div>

                {/* 3. PHOTO URL */}
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Avatar Image URL</label>
                    <div className="relative">
                        <input
                            type="url"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition font-mono text-xs"
                        />
                        <Camera className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-600" />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                    <Save className="h-4 w-4" />
                    <span>{updating ? "Saving Specs..." : "Save Identity Specs"}</span>
                </button>

            </form>
        </div>
    );
}