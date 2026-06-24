'use client';
import { useEffect, useState, use } from "react";
import { Shield, Clock, DollarSign, ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LawyerProfile({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const lawyerId = params.id;
  
  const { user, role } = useAuth();
  const router = useRouter();

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);

  const [description, setDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  useEffect(() => {
    if (!lawyerId) return;
    
    fetch(`https://legalease-server-neon.vercel.app/lawyer/${lawyerId}`)
      .then((res) => res.json())
      .then((data) => {
        setLawyer(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch(`https://legalease-server-neon.vercel.app/reviews/lawyer/${lawyerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (data && Array.isArray(data.result)) {
          setReviews(data.result);
        } else if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          setReviews([]); 
        }
      })
      .catch((err) => {
        console.error(err);
        setReviews([]);
      });
  }, [lawyerId]);

  const handleBookingTrigger = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first to hire a lawyer!");
      return router.push("/login");
    }
    if (role !== 'user') {
      return toast.error("Only normal clients/users can send hiring requests.");
    }
    setIsModalOpen(true);
  };

  const handleHiringRequest = async () => {
    setSubmitting(true);
    const hiringData = {
      clientName: user.name,
      clientEmail: user.email,
      lawyerId: lawyer._id,
      lawyerName: lawyer.name,
      lawyerEmail: lawyer.email,
      specialization: lawyer.specialization,
      fee: lawyer.fee,
      status: 'pending',
      date: preferredDate || new Date().toLocaleDateString(),
      brief: description
    };

    try {
      const res = await fetch('https://legalease-server-neon.vercel.app/hiring-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hiringData)
      });
      const data = await res.json();
      if (data.success || res.ok) {
        toast.success(`Hiring request sent to ${lawyer.name}!`);
        setIsModalOpen(false);
        router.push('/dashboard/user/hiring-history');
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first to leave a review!");
      return router.push("/login");
    }
    if (!comment.trim()) return toast.error("Comment cannot be empty!");

    setReviewLoading(true);
    const reviewData = {
      lawyerId: lawyerId,
      clientName: user.name || "Anonymous Client",
      clientEmail: user.email,
      comment: comment,
      rating: Number(rating),
      date: new Date().toLocaleDateString()
    };

    try {
      const res = await fetch('https://legalease-server-neon.vercel.app/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      const data = await res.json();
      if (data.success || res.ok) {
        toast.success("Review added successfully!");
        setComment("");
        setReviews(prev => [
          { ...reviewData, _id: data.insertedId || Date.now().toString() }, 
          ...(Array.isArray(prev) ? prev : [])
        ]);
      }
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
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
          
          {/* LEFT: LAWYER INFO & REVIEWS */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Leave a feedback */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-md font-bold text-white mb-4 tracking-wide uppercase text-xs border-l-4 border-emerald-400 pl-2">Leave a Feedback</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Select Rating</label>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-3 text-xs text-amber-400 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Your Comment</label>
                    <textarea 
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with this counsel..."
                      className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none transition"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={reviewLoading}
                    className="w-full bg-slate-800 hover:bg-slate-700/80 text-emerald-400 border border-emerald-500/10 text-xs font-semibold py-2.5 rounded-xl transition-all"
                  >
                    {reviewLoading ? "Submitting..." : "Post Elite Review"}
                  </button>
                </form>
              </div>

              {/* View client feedbacks */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
                <h3 className="text-md font-bold text-white mb-4 tracking-wide uppercase text-xs border-l-4 border-emerald-400 pl-2">
                  Client Feedbacks ({Array.isArray(reviews) ? reviews.length : 0})
                </h3>
                
                {!reviews || !Array.isArray(reviews) || reviews.length === 0 ? (
                  <p className="text-xs text-slate-500 italic my-auto text-center">No client insights yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-4 max-h-[290px] overflow-y-auto pr-1">
                    {reviews?.map((rev) => (
                      <div key={rev._id} className="border-b border-slate-800/60 pb-3 last:border-none last:pb-0">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="text-xs font-bold text-white">{rev.clientName}</h5>
                          <span className="text-[11px] text-amber-400 font-medium">⭐ {rev.rating}.0</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-1">{rev.date}</p>
                        <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: APPOINTMENT FORM */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-6 lg:sticky lg:top-6">
            <h3 className="text-lg font-bold border-l-4 border-emerald-400 pl-2">Secure Consultation</h3>
            
            <form onSubmit={handleBookingTrigger} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Brief Case Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a summary of your legal dispute..."
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition resize-none"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Preferred Date</label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3.5 h-4 w-4 text-slate-500" />
                  <input
                    required
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
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
          </div>

        </div>

        {/* ─── PREMIUM CONFIRMATION MODAL ─── */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0f172a] border border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <h3 className="text-lg font-black tracking-tight mb-2 text-white">Confirm Hiring Request</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                You are requesting an official case submission to <span className="text-emerald-400 font-bold">{lawyer.name}</span>. 
                The professional rate is calculated at <span className="text-white font-semibold">${lawyer.fee}/hour</span>.
              </p>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-medium transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleHiringRequest}
                  disabled={submitting}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center"
                >
                  {submitting ? "Processing Brief..." : "Confirm & Send"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}