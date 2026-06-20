export default function SkeletonCard() {
  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-800 rounded w-24"></div>
        <div className="h-5 bg-slate-800 rounded w-16"></div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-6 bg-slate-800 rounded w-3/4"></div>
        <div className="h-4 bg-slate-800 rounded w-full"></div>
      </div>
      <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
        <div className="h-4 bg-slate-800 rounded w-16"></div>
        <div className="h-6 bg-slate-800 rounded w-20"></div>
      </div>
      <div className="h-9 bg-slate-800 rounded-xl w-full pt-2"></div>
    </div>
  );
}