import { UserCheck, CalendarCheck, CreditCard } from "lucide-react";

const steps = [
  { id: 1, title: "Discover Experts", desc: "Browse verified profiles based on specialization & rates.", icon: UserCheck },
  { id: 2, title: "Book Consultation", desc: "Submit your legal brief and await lawyer validation.", icon: CalendarCheck },
  { id: 3, title: "Secure Payment", desc: "Execute safe Stripe transactions post legal acceptance.", icon: CreditCard },
];

export default function ProcessFlow() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
      <h2 className="text-xl font-black uppercase tracking-wider text-slate-400 border-l-4 border-cyan-400 pl-3 text-xs">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="bg-[#0f172a]/40 border border-slate-800/60 p-6 rounded-2xl relative overflow-hidden">
              <span className="absolute top-2 right-4 text-5xl font-black text-slate-800/20 select-none">0{step.id}</span>
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 rounded-xl w-fit mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}