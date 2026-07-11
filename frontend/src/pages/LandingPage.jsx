import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustedBy from "../components/landing/TrustedBy";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Security from "../components/landing/Security";
import AISection from "../components/landing/AISection";
import FAQ from "../components/landing/FAQ";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Security />
      <AISection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}