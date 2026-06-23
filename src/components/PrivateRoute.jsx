'use client';
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children, allowedRoles }) {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }

        if (!loading && user && allowedRoles && !allowedRoles.includes(role)) {
            router.push("/");
        }
    }, [user, role, loading, router, allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0b0f19]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00cc88]"></div>
            </div>
        );
    }

    if (user && (!allowedRoles || allowedRoles.includes(role))) {
        return children;
    }

    return null;
}