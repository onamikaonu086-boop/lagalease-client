'use client';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

export default function DashboardLayout({ children }) {
    const { role, logout } = useAuth();
    const pathname = usePathname();

    const menuItems = {
        user: [
            { name: "Hiring History", path: "/dashboard/user/hiring-history" },
            { name: "Update Profile", path: "/dashboard/user/update-profile" },
            { name: "My Comments", path: "/dashboard/user/comments" },
        ],
        lawyer: [
            { name: "Hiring Requests", path: "/dashboard/lawyer/hiring-history" },
            { name: "Manage Profile", path: "/dashboard/lawyer/manage-legal-profile" },
        ],
        admin: [
            { name: "Manage Users", path: "/dashboard/admin/manage-users" },
            { name: "All Transactions", path: "/dashboard/admin/all-transactions" },
            { name: "Analytics Overview", path: "/dashboard/admin/analytics" },
        ],
    };

    const currentMenu = menuItems[role] || [];

    return (
        <PrivateRoute>
            <div className="flex min-h-screen bg-[#0b0f19] text-white">
                <aside className="w-64 bg-[#111827] border-r border-gray-800 p-6 flex flex-col justify-between">
                    <div>
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#00cc88] tracking-wider">LegalEase</h2>
                            <p className="text-xs text-gray-400 capitalize mt-1">Portal: {role}</p>
                        </div>
                        <nav className="space-y-2">
                            {currentMenu.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                            isActive
                                            ? "bg-[#00cc88] text-black font-semibold shadow-lg shadow-[#00cc88]/20"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 py-2.5 px-4 rounded-lg text-sm font-medium transition-all"
                    >
                        Logout
                    </button>
                </aside>

                <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </PrivateRoute>
    );
}