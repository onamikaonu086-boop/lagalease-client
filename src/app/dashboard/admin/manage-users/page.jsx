'use client';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Shield, UserCheck, Users, ShieldAlert } from "lucide-react";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users directory");
                return res.json();
            })
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Error loading user directory:", err);
                setUsers([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleRoleUpdate = async (id, newRole, userName) => {
        try {
            const res = await fetch(`http://localhost:5000/users/role/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });
            const data = await res.json();

            if (data.modifiedCount > 0) {
                toast.success(`${userName || "User"} is now a ${newRole}!`);
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === id ? { ...user, role: newRole } : user
                    )
                );
            } else {
                toast.error("No changes were made to the security clearance.");
            }
        } catch (error) {
            toast.error("Failed to update user role");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-slate-400 text-sm p-6 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                <span>Loading secure user directory...</span>
            </div>
        );
    }

    const hasUsers = Array.isArray(users) && users.length > 0;

    return (
        <div className="max-w-6xl w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Shield className="h-6 w-6 text-emerald-400" />
                    <span>Manage System Users</span>
                </h1>
                <p className="text-xs text-gray-400 mt-1">Review all registered accounts and modify security clearances or roles.</p>
            </div>

            {!hasUsers ? (
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-10 text-center text-gray-500 text-sm max-w-xl">
                    <Users className="h-8 w-8 mx-auto text-gray-650 mb-2" />
                    No users found in the system.
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#0f172a] border border-slate-800/80 rounded-2xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th className="p-4">User Details</th>
                                <th className="p-4">Email Address</th>
                                <th className="p-4">Current Role</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-800/20 transition-all group">
                                    <td className="p-4 font-semibold text-white text-sm">
                                        {u.name || "Anonymous User"}
                                    </td>
                                    <td className="p-4 font-mono text-gray-500">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border tracking-wider ${
                                            u.role === 'admin' ? 'bg-rose-500/5 text-rose-400 border-rose-500/20' :
                                            u.role === 'lawyer' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' :
                                            'bg-slate-500/5 text-slate-400 border-slate-500/20'
                                        }`}>
                                            {u.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center space-x-2">
                                            {u.role !== 'lawyer' && (
                                                <button
                                                    onClick={() => handleRoleUpdate(u._id, 'lawyer', u.name)}
                                                    className="bg-slate-900 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/20 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-all flex items-center space-x-1"
                                                >
                                                    <UserCheck className="h-3 w-3" />
                                                    <span>Make Lawyer</span>
                                                </button>
                                            )}
                                            {u.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleRoleUpdate(u._id, 'admin', u.name)}
                                                    className="bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/20 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-all flex items-center space-x-1"
                                                >
                                                    <ShieldAlert className="h-3 w-3" />
                                                    <span>Make Admin</span>
                                                </button>
                                            )}
                                            {u.role === 'admin' && (
                                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider italic">
                                                    Root Admin Account
                                                </span>
                                            )}
                                        </div>
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