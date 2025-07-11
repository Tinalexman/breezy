"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { useRef } from "react";

const features = [
  {
    icon: "🚀",
    title: "Lightning Fast Deployment",
    description:
      "Deploy your Flutter app in under 2 minutes with our optimized build pipeline.",
    gradient: "from-blue-500 to-cyan-500",
    color: "text-blue-500",
  },
  {
    icon: "🌐",
    title: "Global CDN",
    description:
      "Your app is served from edge locations worldwide for instant loading anywhere.",
    gradient: "from-green-500 to-emerald-500",
    color: "text-green-500",
  },
  {
    icon: "📱",
    title: "PWA Support",
    description:
      "Your Flutter app runs as a Progressive Web App with native-like experience.",
    gradient: "from-purple-500 to-pink-500",
    color: "text-purple-500",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Enterprise-grade security with automatic HTTPS and privacy protection.",
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-500",
  },
  {
    icon: "📊",
    title: "Analytics & Insights",
    description:
      "Track user engagement, performance metrics, and get actionable insights.",
    gradient: "from-indigo-500 to-blue-500",
    color: "text-indigo-500",
  },
  {
    icon: "⚡",
    title: "Auto Scaling",
    description:
      "Automatic scaling handles traffic spikes without any configuration needed.",
    gradient: "from-teal-500 to-green-500",
    color: "text-teal-500",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const featuresY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "75%"]);

  return (
    <section
      ref={containerRef}
      className="py-20 bg-theme-background relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-2xl" />
      </motion.div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        {/* Section Header with Parallax */}
        <motion.div
          style={{ y: headerY }}
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
            Everything You Need
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Powerful features designed to make Flutter web deployment seamless
            and efficient.
          </p>
        </motion.div>

        {/* Features Grid with Parallax */}
        <motion.div
          style={{ y: featuresY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full relative overflow-hidden transition-all duration-300">
                {/* Gradient Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0`}
                />

                <CardContent className="p-6 relative">
                  {/* Icon with Parallax Effect */}
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 10,
                      transition: { duration: 0.3 },
                    }}
                    className="text-center mb-4"
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 2, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                      className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300"
                    >
                      {feature.icon}
                    </motion.div>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} mx-auto opacity-20`}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)] group-hover:text-theme-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect Indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Parallax Content */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/5 to-transparent" />
            <CardContent className="p-8 relative">
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-4"
              >
                🎯
              </motion.div>
              <h3 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                Built for Flutter Developers
              </h3>
              <p className="text-theme-muted font-[family-name:var(--font-epilogue)] max-w-2xl mx-auto">
                Every feature is designed with Flutter developers in mind. From
                seamless GitHub integration to automatic PWA generation, we
                handle the complexity so you can focus on building amazing apps.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
