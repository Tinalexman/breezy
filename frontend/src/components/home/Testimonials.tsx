"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    quote:
      "Breezy made deploying my Flutter app incredibly simple. From build to global sharing in under 5 minutes!",
    author: "Sarah Chen",
    role: "Mobile Developer",
    company: "TechFlow Inc",
    rating: 5,
    avatar: "👩‍💻",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "The seamless integration with GitHub and instant deployment has revolutionized how we share our prototypes.",
    author: "Marcus Rodriguez",
    role: "Lead Developer",
    company: "InnovateLabs",
    rating: 5,
    avatar: "👨‍💻",
    color: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "Finally, a platform that understands Flutter developers. The cross-platform sharing is game-changing.",
    author: "Emma Thompson",
    role: "App Developer",
    company: "MobileFirst",
    rating: 5,
    avatar: "👩‍💻",
    color: "from-green-500 to-emerald-500",
  },
  {
    quote:
      "Our team can now share app demos instantly with clients. Breezy has streamlined our entire workflow.",
    author: "David Kim",
    role: "Product Manager",
    company: "AppWorks",
    rating: 5,
    avatar: "👨‍💼",
    color: "from-orange-500 to-red-500",
  },
  {
    quote:
      "The analytics and insights help us understand user engagement better than ever before.",
    author: "Lisa Wang",
    role: "UX Designer",
    company: "DesignHub",
    rating: 5,
    avatar: "👩‍🎨",
    color: "from-indigo-500 to-blue-500",
  },
  {
    quote:
      "Free, fast, and reliable. Breezy has become an essential part of our development toolkit.",
    author: "Alex Johnson",
    role: "Full Stack Developer",
    company: "CodeCraft",
    rating: 5,
    avatar: "👨‍💻",
    color: "from-teal-500 to-green-500",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section ref={ref} className="py-20 bg-theme-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-theme-primary text-sm font-semibold tracking-wider uppercase">
              Testimonials
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
            Loved by Developers
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Join thousands of developers who trust Breezy to share their Flutter
            applications with the world.
          </p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="relative overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${testimonials[currentIndex].color} opacity-5`}
            />
            <CardContent className="p-8 relative">
              <div className="text-center">
                {/* Rating */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center mb-6"
                  >
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="text-yellow-400 text-2xl"
                        >
                          ⭐
                        </motion.span>
                      )
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Quote */}
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-theme-foreground mb-8 italic font-[family-name:var(--font-epilogue)] leading-relaxed"
                  >
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </motion.blockquote>
                </AnimatePresence>

                {/* Author */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <motion.div
                      className="text-3xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {testimonials[currentIndex].avatar}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                        {testimonials[currentIndex].author}
                      </div>
                      <div className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                        {testimonials[currentIndex].role} at{" "}
                        {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-theme-card border border-theme-border hover:bg-theme-primary hover:text-white transition-colors duration-200"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-theme-card border border-theme-border hover:bg-theme-primary hover:text-white transition-colors duration-200"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </CardContent>
          </Card>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-theme-primary scale-125"
                    : "bg-theme-border hover:bg-theme-muted"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Apps Deployed", icon: "📱" },
              { value: "5K+", label: "Developers", icon: "👨‍💻" },
              { value: "150+", label: "Countries", icon: "🌍" },
              { value: "99.9%", label: "Uptime", icon: "⚡" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-theme-primary mb-2 font-[family-name:var(--font-fraunces)]">
                  {stat.value}
                </div>
                <div className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
