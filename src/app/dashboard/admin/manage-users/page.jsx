'use client';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Shield, UserCheck, UserX } from "lucide-react";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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
                toast.success(`${userName} is now a ${newRole}!`);
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === id ? { ...user, role: newRole } : user
                    )
                );
            }
        } catch (error) {
            toast.error("Failed to update user role");
        }
    };

    if (loading) return <div className="text-gray-400 text-sm">Loading user directory...</div>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Manage System Users</h1>
                <p className="text-xs text-gray-400 mt-1">Review all registered accounts and modify security clearances or roles.</p>
            </div>

            {users.length === 0 ? (
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center text-gray-400">
                    No users found in the system.
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#111827] border border-gray-800 rounded-xl shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <th className="p-4">User Details</th>
                                <th className="p-4">Email Address</th>
                                <th className="p-4">Current Role</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-gray-800/30 transition-all">
                                    <td className="p-4 font-medium text-white">{u.name || "Anonymous User"}</td>
                                    <td className="p-4 text-gray-400">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${
                                            u.role === 'admin' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                            u.role === 'lawyer' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                        }`}>
                                            {u.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center flex items-center justify-center space-x-2">
                                        {u.role !== 'lawyer' && (
                                            <button
                                                onClick={() => handleRoleUpdate(u._id, 'lawyer', u.name)}
                                                className="bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/20 text-xs px-2.5 py-1.5 rounded-lg transition-all"
                                                title="Make Lawyer"
                                            >
                                                Make Lawyer
                                            </button>
                                        )}
                                        {u.role !== 'admin' && (
                                            <button
                                                onClick={() => handleRoleUpdate(u._id, 'admin', u.name)}
                                                className="bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 text-xs px-2.5 py-1.5 rounded-lg transition-all"
                                                title="Make Admin"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {u.role === 'admin' && u.role === 'lawyer' && (
                                            <span className="text-xs text-gray-500 italic">No Action Required</span>
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