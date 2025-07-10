"use client";

import Footer from "@/components/reusable/Footer";
import Hero from "@/components/home/Hero";
import Header from "@/components/reusable/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-theme-background text-theme-foreground">
      <div className="relative w-full h-full">
        <Header />
        <main className="mx-auto">
          <Hero />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
