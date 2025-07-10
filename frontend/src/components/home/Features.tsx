"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: "🚀",
    title: "Easy Deployment & Global Sharing",
    description:
      "Deploy your Flutter apps with just a few clicks and share them with users worldwide. No complex setup required, instant access across all devices.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "📱",
    title: "Cross-Platform & Lightning Fast",
    description:
      "Your Flutter apps work seamlessly on iOS, Android, and web platforms with optimized delivery ensuring quick loading and smooth performance.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "🔒",
    title: "Secure & Analytics-Driven",
    description:
      "Enterprise-grade security keeps your apps and data protected while detailed analytics help you track performance and user engagement.",
    color: "from-indigo-500 to-blue-500",
  },
];

const Features = () => {
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="text-4xl my-2">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-theme-muted">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                Ready to Get Started?
              </h3>
              <p className="text-theme-muted mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already sharing their
                Flutter apps with Breezy. Start your journey today and reach
                users worldwide.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Start Building
                </Button>
                <Button variant="outline" size="lg">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
