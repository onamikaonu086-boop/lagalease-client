'use client';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/hiring-request/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setAppointment(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching appointment:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00cc88]"></div>
            </div>
        );
    }

    if (!appointment) {
        return <div className="text-center text-red-400 mt-10">Hiring request details not found!</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-[#111827] border border-gray-800 rounded-xl p-8 shadow-xl mt-12">
            <h2 className="text-2xl font-bold text-white mb-2">Secure Payment</h2>
            <p className="text-sm text-gray-400 mb-6">Complete your payment securely using credit or debit card.</p>

            <div className="mb-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-gray-300 space-y-1.5">
                <p><span className="text-gray-400">Lawyer:</span> <strong className="text-white">{appointment.lawyerName}</strong></p>
                <p><span className="text-gray-400">Specialization:</span> {appointment.specialization}</p>
                <p><span className="text-gray-400">Amount to Pay:</span> <strong className="text-[#00cc88]">${appointment.fee}</strong></p>
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm appointment={appointment} />
            </Elements>
        </div>
    );
}