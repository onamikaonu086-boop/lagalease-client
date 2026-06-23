'use client';
import { useAuth } from "@/context/AuthContext";
import { Shield, User, Briefcase, LayoutDashboard, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardMainPage() {
    const { user, role } = useAuth();

    return (
        <div className="max-w-4xl space-y-8">
            {/* WELCOME BANNER */}
            <div className="bg-gradient-to-r from-gray-900 via-[#0f172a] to-gray-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                    <LayoutDashboard className="h-40 w-40 text-white" />
                </div>
                
                <div className="space-y-2 relative z-10">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-semibold uppercase tracking-wider border border-emerald-500/20">
                        {role || 'Client Workspace'}
                    </span>
                    <h1 className="text-3xl font-black text-white tracking-tight pt-2">
                        Welcome Back, <span className="text-emerald-400">{user?.name || "Premium Member"}</span>
                    </h1>
                    <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                        Access your global legal counsel workspace, manage pending briefs, track transactions, and execute system operations from your elite terminal.
                    </p>
                </div>
            </div>

            {/* ROLE-BASED QUICK ACTIONS */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Navigation</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* IF USER IS A CLIENT / NORMAL USER */}
                    {(role === 'user' || !role) && (
                        <>
                            <Link href="/dashboard/user/hiring-history" className="bg-[#0f172a] border border-slate-800 hover:border-emerald-500/40 p-5 rounded-xl transition group flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                                        <Briefcase className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Hiring & Case History</h4>
                                        <p className="text-xs text-slate-500">Track requested counsels and process payments.</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                            </Link>

                            <Link href="/dashboard/user/comments" className="bg-[#0f172a] border border-slate-800 hover:border-cyan-500/40 p-5 rounded-xl transition group flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">My Reviews & Feedbacks</h4>
                                        <p className="text-xs text-slate-500">Manage all insights left on professional profiles.</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </>
                    )}

                    {/* IF USER IS A LAWYER */}
                    {role === 'lawyer' && (
                        <>
                            <Link href="/dashboard/lawyer/hiring-requests" className="bg-[#0f172a] border border-slate-800 hover:border-emerald-500/40 p-5 rounded-xl transition group flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                                        <Briefcase className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Client Brief Requests</h4>
                                        <p className="text-xs text-slate-500">Review incoming briefs, accept or reject legal cases.</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                            </Link>

                            <Link href="/dashboard/lawyer/manage-legal-profile" className="bg-[#0f172a] border border-slate-800 hover:border-cyan-500/40 p-5 rounded-xl transition group flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Manage Legal Profile</h4>
                                        <p className="text-xs text-slate-500">Edit your consultation rates and current availability.</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </>
                    )}

                    {/* IF USER IS AN ADMIN */}
                    {role === 'admin' && (
                        <>
                            <Link href="/dashboard/admin/analytics" className="bg-[#0f172a] border border-slate-800 hover:border-emerald-500/40 p-5 rounded-xl transition group flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                                        <LayoutDashboard className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">System Analytics Overview</h4>
                                        <p className="text-xs text-slate-500">Track global revenue, user growth, and traffic analytics.</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                            </Link>

                            <Link href="/dashboard/admin/manage-users" className="bg-[#0f172a] border border-slate-800 hover:border-red-500/40 p-5 rounded-xl transition group flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Manage System Users</h4>
                                        <p className="text-xs text-slate-500">Modify global roles and clearances for all directory members.</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}