"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Connect Your Repository",
    description:
      "Link your GitHub repository containing your Flutter project. We support both public and private repositories.",
    icon: "🔗",
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    details: [
      "OAuth Authentication",
      "Repository Selection",
      "Permission Setup",
    ],
  },
  {
    number: "02",
    title: "Build & Deploy",
    description:
      "Our platform automatically builds your Flutter app and deploys it to our global CDN in under 2 minutes.",
    icon: "⚡",
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    details: ["Automatic Build", "Dependency Resolution", "Optimization"],
  },
  {
    number: "03",
    title: "Share Globally",
    description:
      "Get a unique URL that you can share with anyone. Your app runs directly in their browser, no installation needed.",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    details: ["Unique URL", "PWA Support", "Cross-Platform"],
  },
  {
    number: "04",
    title: "Monitor & Analyze",
    description:
      "Track user engagement, performance metrics, and get insights to improve your app experience.",
    icon: "📊",
    color: "from-orange-500 to-red-500",
    gradient: "bg-gradient-to-r from-orange-500 to-red-500",
    details: ["Real-time Analytics", "Performance Metrics", "User Insights"],
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeStep, setActiveStep] = useState(0);

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
              Process
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
            How It Works
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Deploy your Flutter app in just a few simple steps. No complex
            configuration required.
          </p>
        </motion.div>

        {/* Interactive Steps */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setActiveStep(index)}
                className="group cursor-pointer"
              >
                <Card className="h-full relative overflow-hidden transition-all duration-300">
                  {/* Active State Overlay */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: activeStep === index ? 0.1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 ${step.gradient}`}
                  />

                  <CardContent className="p-6 relative">
                    {/* Step Number */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute -top-4 -left-4 w-10 h-10 bg-theme-primary text-white rounded-full flex items-center justify-center text-sm font-bold font-[family-name:var(--font-fraunces)] shadow-lg"
                    >
                      {step.number}
                    </motion.div>

                    {/* Icon */}
                    <div className="text-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300"
                      >
                        {step.icon}
                      </motion.div>
                      <motion.div
                        animate={{
                          scale: activeStep === index ? 1.2 : 1,
                          opacity: activeStep === index ? 0.3 : 0.2,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-full ${step.gradient} mx-auto`}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)] group-hover:text-theme-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-theme-muted font-[family-name:var(--font-epilogue)] mb-4">
                        {step.description}
                      </p>

                      {/* Details */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: activeStep === index ? 1 : 0,
                          height: activeStep === index ? "auto" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 text-left">
                          {step.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detailIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{
                                opacity: activeStep === index ? 1 : 0,
                                x: activeStep === index ? 0 : -10,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: detailIndex * 0.1,
                              }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className="w-1.5 h-1.5 bg-theme-primary rounded-full" />
                              <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                                {detail}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            {steps.map((_, index) => (
              <motion.div key={index} className="flex items-center">
                <motion.div
                  animate={{
                    scale: activeStep === index ? 1.2 : 1,
                    backgroundColor:
                      activeStep === index
                        ? "var(--theme-primary)"
                        : "var(--theme-border)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-3 h-3 rounded-full"
                />
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{
                      width: activeStep > index ? "2rem" : "1rem",
                      backgroundColor:
                        activeStep > index
                          ? "var(--theme-primary)"
                          : "var(--theme-border)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 mx-2"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/5 to-transparent" />
            <CardContent className="p-8 relative">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]"
              >
                Complete Workflow
              </motion.h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                {[
                  { icon: "📱", label: "Flutter App" },
                  { icon: "🔗", label: "GitHub" },
                  { icon: "⚡", label: "Breezy" },
                  { icon: "🌐", label: "Global Access" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 group"
                  >
                    <motion.span
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl group-hover:scale-110 transition-transform duration-300"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-theme-muted font-[family-name:var(--font-epilogue)] group-hover:text-theme-foreground transition-colors duration-200">
                      {item.label}
                    </span>
                    {index < 3 && (
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-theme-muted text-xl"
                      >
                        →
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
