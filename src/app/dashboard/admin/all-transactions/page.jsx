'use client';
import { useEffect, useState } from "react";
import { DollarSign, Hash, CreditCard, ShieldCheck } from "lucide-react";

export default function AllTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/admin/transactions")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch financial transactions");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setTransactions(data);
                } else if (data && Array.isArray(data.transactions)) {
                    setTransactions(data.transactions);
                } else {
                    setTransactions([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching transactions:", err);
                setTransactions([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-slate-400 text-sm p-6 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                <span>Loading financial ledgers...</span>
            </div>
        );
    }

    const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

    return (
        <div className="max-w-6xl w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-emerald-400" />
                    <span>Global Transactions</span>
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                    Monitor all elite payments processing through Stripe gateways.
                </p>
            </div>

            {!hasTransactions ? (
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-10 text-center text-gray-500 text-sm max-w-xl">
                    <ShieldCheck className="h-8 w-8 mx-auto text-gray-650 mb-2" />
                    No successful transactions recorded yet.
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#0f172a] border border-slate-800/80 rounded-2xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Client Details</th>
                                <th className="p-4">Hired Expert</th>
                                <th className="p-4">Amount Paid</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                            {transactions.map((tx) => (
                                <tr key={tx._id} className="hover:bg-slate-800/20 transition-all group">
                                    <td className="p-4">
                                        <div className="font-mono text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded-lg w-fit flex items-center space-x-1 select-all">
                                            <Hash className="h-3 w-3 text-emerald-600/70" />
                                            <span>{tx.transactionId || "tx_live_untracked"}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-semibold text-white text-sm">{tx.clientName || "Anonymous Client"}</p>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">{tx.clientEmail}</p>
                                    </td>
                                    <td className="p-4 font-medium text-slate-200">
                                        {tx.lawyerName || "Legal Consultant"}
                                    </td>
                                    <td className="p-4">
                                        <span className="font-bold text-white text-sm">
                                            ${tx.fee || tx.price || tx.amount || 0}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider">
                                            Success
                                        </span>
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