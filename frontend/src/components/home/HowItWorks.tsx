"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Connect Your Repository",
    description:
      "Link your GitHub repository containing your Flutter project. We support both public and private repositories.",
    icon: "🔗",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "Build & Deploy",
    description:
      "Our platform automatically builds your Flutter app and deploys it to our global CDN in under 2 minutes.",
    icon: "⚡",
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "03",
    title: "Share Globally",
    description:
      "Get a unique URL that you can share with anyone. Your app runs directly in their browser, no installation needed.",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "04",
    title: "Monitor & Analyze",
    description:
      "Track user engagement, performance metrics, and get insights to improve your app experience.",
    icon: "📊",
    color: "from-orange-500 to-red-500",
  },
];

const HowItWorks = () => {
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
            How It Works
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Deploy your Flutter app in just a few simple steps. No complex
            configuration required.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full relative">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-theme-primary text-white rounded-full flex items-center justify-center text-sm font-bold font-[family-name:var(--font-fraunces)]">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{step.icon}</div>
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} opacity-20 mx-auto`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]">
                      {step.title}
                    </h3>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                Complete Workflow
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                    Flutter App
                  </span>
                </div>
                <div className="text-theme-muted">→</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔗</span>
                  <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                    GitHub
                  </span>
                </div>
                <div className="text-theme-muted">→</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                    Breezy
                  </span>
                </div>
                <div className="text-theme-muted">→</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                    Global Access
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
