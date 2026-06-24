import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center space-y-6">
      <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
        Your Premium Gateway to Elite{" "}
        <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Legal Assistance
        </span>
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
        Connect with vetted professional lawyers and legal experts online. Secure consultation, transparent pricing, and instant hiring.
      </p>
      <div className="pt-4">
        <Link href="/browse" className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/10 text-sm">
          <span>Find Expert Counsel Now</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}