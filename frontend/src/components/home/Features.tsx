"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const features = [
  {
    icon: "🚀",
    title: "Easy Deployment & Global Sharing",
    description:
      "Deploy your Flutter apps with just a few clicks and share them with users worldwide. No complex setup required, instant access across all devices.",
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    stats: "2min deploy",
  },
  {
    icon: "📱",
    title: "Cross-Platform & Lightning Fast",
    description:
      "Your Flutter apps work seamlessly on iOS, Android, and web platforms with optimized delivery ensuring quick loading and smooth performance.",
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    stats: "3 platforms",
  },
  {
    icon: "🔒",
    title: "Secure & Analytics-Driven",
    description:
      "Enterprise-grade security keeps your apps and data protected while detailed analytics help you track performance and user engagement.",
    color: "from-indigo-500 to-blue-500",
    gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    stats: "99.9% uptime",
  },
];

const Features = () => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleDeploy = () => {
    router.push("/auth");
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
              Features
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
            Powerful Features
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Everything you need to share your Flutter applications with the
            world. Built for developers, designed for success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card
                hover
                className="h-full relative overflow-hidden transition-all duration-300"
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <CardHeader className="relative">
                  <motion.div
                    className="text-4xl my-2 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Stats Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="absolute top-4 right-4"
                  >
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${feature.gradient}`}
                    >
                      {feature.stats}
                    </span>
                  </motion.div>

                  <h3 className="text-xl font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)] group-hover:text-theme-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-theme-muted group-hover:text-theme-foreground transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Interactive Element */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="mt-4 flex items-center gap-2 text-theme-primary font-semibold group-hover:gap-3 transition-all duration-300"
                  >
                    <span className="text-sm">Learn more</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/20 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-theme-primary/10 rounded-full translate-y-12 -translate-x-12" />
            </div>

            <CardContent className="text-center py-12 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-6"
              >
                <span className="text-4xl">🎯</span>
              </motion.div>

              <h3 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                Ready to Get Started?
              </h3>
              <p className="text-theme-muted mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already sharing their
                Flutter apps with Breezy. Start your journey today and reach
                users worldwide.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="lg" onClick={handleDeploy}>
                  Deploy your first app
                  <ArrowRightCircleIcon className="size-5" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
