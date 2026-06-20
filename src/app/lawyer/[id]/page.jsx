'use client';
import { useEffect, useState, use } from "react";
import { Shield, Clock, DollarSign, ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function LawyerProfile({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const lawyerId = params.id;

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (!lawyerId) return;
    
    fetch(`http://localhost:5000/lawyer/${lawyerId}`)
      .then((res) => res.json())
      .then((data) => {
        setLawyer(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lawyerId]);

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-white">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-12 w-12 bg-emerald-500/20 border border-emerald-500/30 rounded-full mx-auto animate-spin border-t-transparent"></div>
          <p className="text-slate-400 text-sm">Loading Premium Profile...</p>
        </div>
      </div>
    );
  }

  if (!lawyer || lawyer.message) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-white space-y-4">
        <p className="text-slate-400">Lawyer Profile Not Found.</p>
        <Link href="/browse" className="text-emerald-400 text-sm hover:underline flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" /> <span>Back to Browse</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* BACK BUTTON */}
        <Link href="/browse" className="inline-flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Elite Directory</span>
        </Link>

        {/* PROFILE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: LAWYER INFO */}
          <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium border border-emerald-500/20 flex items-center space-x-1">
                  <Shield className="h-3 w-3 mr-1" /> {lawyer.specialization}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${lawyer.status === 'Available' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {lawyer.status || 'Available'}
                </span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white">{lawyer.name}</h1>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">Professional Biography</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base bg-[#0b0f19]/50 p-4 rounded-xl border border-slate-800/60">
                {lawyer.bio}
              </p>
            </div>

            {/* KEY METRICS */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#0b0f19] border border-slate-800 p-4 rounded-xl space-y-1">
                <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  <span>Consultation Fee</span>
                </div>
                <p className="text-xl font-bold text-white">${lawyer.fee} <span className="text-xs text-slate-500 font-normal">/ hour</span></p>
              </div>

              <div className="bg-[#0b0f19] border border-slate-800 p-4 rounded-xl space-y-1">
                <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span>Response Time</span>
                </div>
                <p className="text-xl font-bold text-white">Under 24h</p>
              </div>
            </div>
          </div>

          {/* RIGHT: APPOINTMENT / HIRING FORM */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-6 lg:sticky lg:top-6">
            <h3 className="text-lg font-bold border-l-4 border-emerald-400 pl-2">Secure Consultation</h3>
            
            {bookingSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl text-center space-y-3">
                <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Hiring Request Sent!</h4>
                <p className="text-xs text-slate-400">The specialist will review your brief and contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Brief Case Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide a summary of your legal dispute or consultation requirements..."
                    className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition resize-none"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Preferred Consultation Date</label>
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-3.5 h-4 w-4 text-slate-500" />
                    <input
                      required
                      type="date"
                      className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={lawyer.status === 'Busy'}
                  className={`w-full text-center font-semibold text-xs py-3 rounded-xl transition shadow-lg ${
                    lawyer.status === 'Busy' 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none' 
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/10'
                  }`}
                >
                  {lawyer.status === 'Busy' ? 'Specialist Currently Busy' : `Book Consultation • $${lawyer.fee}`}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}