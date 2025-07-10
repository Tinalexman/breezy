"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: "🚀",
    title: "Easy Deployment",
    description:
      "Deploy your Flutter apps with just a few clicks. No complex setup required.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "🌐",
    title: "Global Sharing",
    description:
      "Share your apps with users worldwide. Instant access across all devices.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: "📱",
    title: "Cross-Platform",
    description:
      "Your Flutter apps work seamlessly on iOS, Android, and web platforms.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Optimized delivery ensures your apps load quickly and run smoothly.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Enterprise-grade security keeps your apps and data protected.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: "📊",
    title: "Analytics & Insights",
    description:
      "Track app performance and user engagement with detailed analytics.",
    color: "from-teal-500 to-green-500",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} opacity-20`}
                    ></div>
                  </div>
                  <h3 className="text-xl font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-theme-muted mb-6">{feature.description}</p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
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
