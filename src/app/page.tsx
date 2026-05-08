import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import DashboardPreview from "@/components/DashboardPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-50">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <DashboardPreview />
      <CTA />
      <Footer />
    </main>
  );
}