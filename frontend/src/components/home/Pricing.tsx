"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

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

  const handleDeploy = () => {
    router.push("/auth");
  };

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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="relative overflow-hidden">
            {/* Free Badge */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              FREE FOREVER
            </div>

            <CardContent className="p-8 text-center">
              {/* Price */}
              <div className="mb-6">
                <div className="text-6xl font-bold text-theme-primary mb-2 font-[family-name:var(--font-fraunces)]">
                  $0
                </div>
                <div className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  per month
                </div>
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]">
                Complete Platform Access
              </h3>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-theme-foreground font-[family-name:var(--font-epilogue)]">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDeploy}
                  className="w-full"
                >
                  Deploy your first app
                  <ArrowRightCircleIcon className="size-5" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Free Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]">
                Why We're Free
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl mb-3">🚀</div>
                  <h4 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                    Democratize Development
                  </h4>
                  <p className="text-theme-muted text-sm font-[family-name:var(--font-epilogue)]">
                    We believe every developer should have access to powerful
                    deployment tools.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🌍</div>
                  <h4 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                    Global Community
                  </h4>
                  <p className="text-theme-muted text-sm font-[family-name:var(--font-epilogue)]">
                    Building a worldwide community of Flutter developers and
                    innovators.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">💡</div>
                  <h4 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                    Innovation First
                  </h4>
                  <p className="text-theme-muted text-sm font-[family-name:var(--font-epilogue)]">
                    Focus on innovation and user experience, not monetization.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
