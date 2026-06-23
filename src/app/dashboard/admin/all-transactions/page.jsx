'use client';
import { useEffect, useState } from "react";
import { DollarSign, Hash, CreditCard, User } from "lucide-react";

export default function AllTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/admin/transactions")
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-gray-400 text-sm">Loading financial ledgers...</div>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Global Transactions</h1>
                <p className="text-xs text-gray-400 mt-1">Monitor all elite payments processing through Stripe gateways.</p>
            </div>

            {transactions.length === 0 ? (
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center text-gray-400">
                    No successful transactions recorded yet.
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#111827] border border-gray-800 rounded-xl shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Client Name</th>
                                <th className="p-4">Hired Expert</th>
                                <th className="p-4">Amount Paid</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                            {transactions.map((tx) => (
                                <tr key={tx._id} className="hover:bg-gray-800/30 transition-all">
                                    <td className="p-4 font-mono text-xs text-emerald-400 select-all flex items-center space-x-1">
                                        <Hash className="h-3 w-3 text-slate-600" />
                                        <span>{tx.transactionId || "tx_mock_12345"}</span>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-medium text-white">{tx.clientName}</p>
                                        <p className="text-xs text-gray-500">{tx.clientEmail}</p>
                                    </td>
                                    <td className="p-4 text-gray-300">{tx.lawyerName}</td>
                                    <td className="p-4 text-white font-bold">${tx.fee}</td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
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