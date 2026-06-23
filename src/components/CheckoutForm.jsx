'use client';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ appointment }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (appointment?.fee > 0) {
            fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: appointment.fee }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [appointment]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);

        if (card == null) {
            setProcessing(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: appointment?.clientName || 'Anonymous Client',
                        email: appointment?.clientEmail || 'unknown@client.com',
                    },
                },
            }
        );

        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            fetch(`http://localhost:5000/hiring-payment-success/${appointment._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transactionId: paymentIntent.id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    toast.success("Payment successful! Professional hired.");
                    router.push("/dashboard/user/hiring-history");
                })
                .catch(() => toast.error("Failed to sync backend status"));
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/40">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#ffffff',
                                '::placeholder': { color: '#9ca3af' },
                            },
                            invalid: { color: '#ef4444' },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="w-full bg-[#00cc88] hover:bg-[#00b377] disabled:bg-gray-800 text-black font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-[#00cc88]/10"
            >
                {processing ? "Processing..." : `Pay $${appointment?.fee}`}
            </button>
        </form>
    );
}