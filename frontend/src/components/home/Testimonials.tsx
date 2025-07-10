"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";

const testimonials = [
  {
    quote:
      "Breezy made deploying my Flutter app incredibly simple. From build to global sharing in under 5 minutes!",
    author: "Sarah Chen",
    role: "Mobile Developer",
    company: "TechFlow Inc",
    rating: 5,
    avatar: "👩‍💻",
  },
  {
    quote:
      "The seamless integration with GitHub and instant deployment has revolutionized how we share our prototypes.",
    author: "Marcus Rodriguez",
    role: "Lead Developer",
    company: "InnovateLabs",
    rating: 5,
    avatar: "👨‍💻",
  },
  {
    quote:
      "Finally, a platform that understands Flutter developers. The cross-platform sharing is game-changing.",
    author: "Emma Thompson",
    role: "App Developer",
    company: "MobileFirst",
    rating: 5,
    avatar: "👩‍💻",
  },
  {
    quote:
      "Our team can now share app demos instantly with clients. Breezy has streamlined our entire workflow.",
    author: "David Kim",
    role: "Product Manager",
    company: "AppWorks",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    quote:
      "The analytics and insights help us understand user engagement better than ever before.",
    author: "Lisa Wang",
    role: "UX Designer",
    company: "DesignHub",
    rating: 5,
    avatar: "👩‍🎨",
  },
  {
    quote:
      "Free, fast, and reliable. Breezy has become an essential part of our development toolkit.",
    author: "Alex Johnson",
    role: "Full Stack Developer",
    company: "CodeCraft",
    rating: 5,
    avatar: "👨‍💻",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-theme-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
            Loved by Developers
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Join thousands of developers who trust Breezy to share their Flutter
            applications with the world.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-theme-foreground mb-6 italic font-[family-name:var(--font-epilogue)]">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-theme-primary mb-2 font-[family-name:var(--font-fraunces)]">
                10K+
              </div>
              <div className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Apps Deployed
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-theme-primary mb-2 font-[family-name:var(--font-fraunces)]">
                5K+
              </div>
              <div className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Developers
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-theme-primary mb-2 font-[family-name:var(--font-fraunces)]">
                150+
              </div>
              <div className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Countries
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-theme-primary mb-2 font-[family-name:var(--font-fraunces)]">
                99.9%
              </div>
              <div className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Uptime
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
