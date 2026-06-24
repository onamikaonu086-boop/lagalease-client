'use client';
import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import PracticeAreas from "@/components/home/PracticeAreas";
import ProcessFlow from "@/components/home/ProcessFlow";
import FeaturedLawyers from "@/components/home/FeaturedLawyers";

export default function Home() {
  const [featuredLawyers, setFeaturedLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://legalease-server-neon.vercel.app/lawyers?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedLawyers(data.result || []);
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-24 pb-24 bg-[#0b0f19] text-white">
      <Hero />
      <PracticeAreas />
      <ProcessFlow />
      <FeaturedLawyers lawyers={featuredLawyers} loading={loading} />
    </div>
  );
}