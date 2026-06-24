import { Shield, Scale, Award, Clock } from "lucide-react";

const categories = [
  { id: 1, title: "Criminal Law", count: "120+ Experts", icon: Shield },
  { id: 2, title: "Corporate & Business", count: "85+ Experts", icon: Scale },
  { id: 3, title: "Family & Divorce", count: "94+ Experts", icon: Award },
  { id: 4, title: "Civil Litigation", count: "150+ Experts", icon: Clock },
];

export default function PracticeAreas() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h2 className="text-xl font-black uppercase tracking-wider text-slate-400 border-l-4 border-emerald-400 pl-3 text-xs">Explore Practice Areas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="bg-[#0f172a] border border-slate-800/60 p-6 rounded-2xl hover:border-slate-700 transition group cursor-pointer shadow-xl">
              <div className="bg-emerald-500/10 p-3 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 transition mb-4 border border-emerald-500/10">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{cat.title}</h3>
              <p className="text-xs text-slate-500">{cat.count}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}