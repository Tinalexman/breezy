"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRightCircleIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

const features = [
  "Unlimited app deployments",
  "Global CDN distribution",
  "Real-time analytics",
  "GitHub integration",
  "Custom domains",
  "Team collaboration",
  "Priority support",
  "No hidden fees",
];

const Pricing = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleDeploy = () => {
    if (isAuthenticated) {
      router.push("/project");
    } else {
      router.push("/auth");
    }
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
              Pricing
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
            Always Free
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            We believe in making Flutter app deployment accessible to everyone.
            No pricing tiers, no hidden fees, just powerful tools for
            developers.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-8 right-8 text-2xl opacity-20"
            >
              🎉
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-8 left-8 text-xl opacity-20"
            >
              ✨
            </motion.div>

            {/* Free Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-4 right-4"
            >
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  FREE FOREVER
                </motion.span>
              </div>
            </motion.div>

            <CardContent className="p-8 text-center relative">
              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-block"
                >
                  <div className="text-7xl font-bold text-theme-primary mb-2 font-[family-name:var(--font-fraunces)]">
                    $0
                  </div>
                  <div className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                    per month
                  </div>
                </motion.div>
              </motion.div>

              {/* Plan Name */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]"
              >
                Complete Platform Access
              </motion.h3>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 group/feature"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckIcon className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className="text-theme-foreground font-[family-name:var(--font-epilogue)] group-hover/feature:text-theme-primary transition-colors duration-200">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleDeploy}
                    className="w-full group/button"
                  >
                    <span className="group-hover/button:mr-2 transition-all duration-200">
                      Deploy your first app
                    </span>
                    <ArrowRightCircleIcon className="size-5 group-hover/button:translate-x-1 transition-transform duration-200" />
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Free Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-16 text-center"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/5 to-transparent" />
            <CardContent className="p-8 relative">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]"
              >
                Why We&apos;re Free
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🚀",
                    title: "Democratize Development",
                    description:
                      "We believe every developer should have access to powerful deployment tools.",
                  },
                  {
                    icon: "🌍",
                    title: "Global Community",
                    description:
                      "Building a worldwide community of Flutter developers and innovators.",
                  },
                  {
                    icon: "💡",
                    title: "Innovation First",
                    description:
                      "Focus on innovation and user experience, not monetization.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 2.0 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300"
                    >
                      {item.icon}
                    </motion.div>
                    <h4 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)] group-hover:text-theme-primary transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-theme-muted text-sm font-[family-name:var(--font-epilogue)] group-hover:text-theme-foreground transition-colors duration-200">
                      {item.description}
                    </p>
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

export default Pricing;
