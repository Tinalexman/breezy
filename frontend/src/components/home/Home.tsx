"use client";

import Footer from "@/components/reusable/Footer";
import Hero from "@/components/home/Hero";
import Header from "@/components/reusable/Header";
import Features from "@/components/home/Features";

const Home = () => {
  return (
    <div className="min-h-screen bg-theme-background text-theme-foreground overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-100">
        <Header />
      </div>
      <main className="mx-auto">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
