'use client';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { UserPlus, User, Mail, ShieldCheck, DollarSign } from "lucide-react";

export default function AddLawyerForm({ onLawyerAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [fee, setFee] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegisterLawyer = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newLawyerData = {
            name,
            email,
            password: "defaultPassword123",
            bio,
            fee: Number(fee),
            role: "lawyer",
            status: "Available"
        };

        try {
            const res = await fetch("https://legalease-server-neon.vercel.app/lawyer/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLawyerData)
            });
            const data = await res.json();

            if (data.success || data.insertedId) {
                toast.success(`Successfully registered Expert: ${name}`);

                setName("");
                setEmail("");
                setBio("");
                setFee("");

                if (onLawyerAdded) onLawyerAdded();
            } else {
                toast.error(data.message || "Could not register lawyer account.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Failed to connect with secure authentication server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mb-10 max-w-4xl">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-emerald-400" />
                    <span>Onboard Verified Legal Expert</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    Directly provision credentialed attorney profiles into the central clearinghouse.
                </p>
            </div>

            <form onSubmit={handleRegisterLawyer} className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* FULL NAME */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <User className="h-3 w-3 text-slate-500" />
                            <span>Expert Full Name</span>
                        </label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Adv. Karim Rahman"
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                        />
                    </div>

                    {/* EMAIL ADDRESS */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Mail className="h-3 w-3 text-slate-500" />
                            <span>Professional Email</span>
                        </label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@firm-domain.com"
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition font-mono"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* BIOGRAPHY */}
                    <div className="space-y-1 sm:col-span-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-slate-500" />
                            <span>Core Expertises & Credentials</span>
                        </label>
                        <input
                            required
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Corporate Law, Supreme Court Advocate, 8+ Years Practice..."
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                        />
                    </div>

                    {/* CONSULTATION FEE */}
                    <div className="space-y-1 sm:col-span-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-emerald-500" />
                            <span>Rate ($/hr)</span>
                        </label>
                        <input
                            required
                            type="number"
                            min="1"
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                            placeholder="150"
                            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                        />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-900 disabled:text-slate-600 disabled:border disabled:border-slate-800 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/5"
                    >
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>{isSubmitting ? "Provisioning..." : "Provision Lawyer"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}