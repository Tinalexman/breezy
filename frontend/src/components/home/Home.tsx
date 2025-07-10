"use client";

import Footer from "@/components/reusable/Footer";
import Hero from "@/components/home/Hero";
import Header from "@/components/reusable/Header";
import Features from "@/components/home/Features";

const Home = () => {
  return (
    <div className="min-h-screen bg-theme-background text-theme-foreground">
      <div className="relative w-full h-full">
        <Header />
        <main className="mx-auto">
          <Hero />
          <Features />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
