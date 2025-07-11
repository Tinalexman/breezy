"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
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
    expandedDescription:
      "Connect your GitHub account securely using OAuth. Select the repository containing your Flutter project. Our platform will request minimal permissions to access only the repositories you choose to deploy.",
    estimatedTime: "30 seconds",
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
    expandedDescription:
      "Our intelligent build system automatically detects your Flutter version, resolves dependencies, and optimizes your app for web deployment. The build process includes code compilation, asset optimization, and PWA generation.",
    estimatedTime: "2 minutes",
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
    expandedDescription:
      "Receive a unique, shareable URL for your deployed app. Your Flutter app runs as a Progressive Web App (PWA) that works on all devices and browsers. Users can access it instantly without any installation.",
    estimatedTime: "Instant",
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
    expandedDescription:
      "Access comprehensive analytics including user engagement, performance metrics, geographic distribution, and real-time usage data. Use these insights to optimize your app and understand your audience better.",
    estimatedTime: "Real-time",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeStep, setActiveStep] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setExpandedStep(expandedStep === index ? null : index);
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

        {/* Interactive Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleStepClick(index)}
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

                      {/* Estimated Time */}
                      <div className="text-sm text-theme-primary font-semibold mb-4">
                        ⏱️ {step.estimatedTime}
                      </div>

                      {/* Details */}
                      <AnimatePresence>
                        {expandedStep === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3 text-left">
                              <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                                {step.expandedDescription}
                              </p>
                              <div className="space-y-2">
                                {step.details.map((detail, detailIndex) => (
                                  <motion.div
                                    key={detailIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
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
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            {steps.map((_, index) => (
              <motion.div key={index} className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleStepClick(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? "bg-theme-primary scale-125"
                      : "bg-theme-border hover:bg-theme-muted"
                  }`}
                />
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{
                      width: activeStep > index ? "3rem" : "1rem",
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

          {/* Step Indicator Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4"
          >
            <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
              Step {activeStep + 1} of {steps.length}:{" "}
              {steps[activeStep]?.title}
            </p>
          </motion.div>
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
