"use client";

import Footer from "@/components/reusable/Footer";
import Hero from "@/components/home/Hero";
import Header from "@/components/reusable/Header";
import Features from "@/components/home/Features";
import Contact from "./Contact";
import FAQ from "./FAQ";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import TechStack from "./TechStack";
import Demo from "./Demo";

const Home = () => {
  return (
    <div className="min-h-screen bg-theme-background text-theme-foreground overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-100">
        <Header />
      </div>
      <main className="mx-auto">
        <Hero />
        <Features />
        <TechStack />
        <HowItWorks />
        <Demo />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
