import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import DashboardPreview from "@/components/DashboardPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";

export default function Home() {
  return (
    <main className="relative bg-slate-50 min-h-screen">
      <DynamicBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Services />
        <HowItWorks />
        <DashboardPreview />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}