"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";

const technologies = [
  {
    name: "Flutter",
    description:
      "Full Flutter framework support with hot reload and native performance",
    icon: "📱",
    color: "from-blue-500 to-cyan-500",
    features: ["Dart Language", "Hot Reload", "Native Performance"],
  },
  {
    name: "Cross-Platform",
    description: "Deploy once, run everywhere - iOS, Android, and Web",
    icon: "🔄",
    color: "from-green-500 to-emerald-500",
    features: ["iOS Support", "Android Support", "Web Support"],
  },
  {
    name: "GitHub Integration",
    description:
      "Seamless integration with GitHub for version control and collaboration",
    icon: "🔗",
    color: "from-purple-500 to-pink-500",
    features: [
      "OAuth Authentication",
      "Repository Access",
      "Team Collaboration",
    ],
  },
  {
    name: "Global CDN",
    description:
      "Lightning-fast delivery through our worldwide content delivery network",
    icon: "⚡",
    color: "from-orange-500 to-red-500",
    features: ["Edge Locations", "Low Latency", "High Availability"],
  },
  {
    name: "Analytics",
    description:
      "Comprehensive analytics and insights to track app performance",
    icon: "📊",
    color: "from-indigo-500 to-blue-500",
    features: ["User Engagement", "Performance Metrics", "Real-time Data"],
  },
  {
    name: "Security",
    description:
      "Enterprise-grade security with SSL encryption and secure deployments",
    icon: "🔒",
    color: "from-teal-500 to-green-500",
    features: ["SSL Encryption", "Secure Deployments", "Privacy Protection"],
  },
];

const platforms = [
  { name: "iOS", icon: "🍎", description: "Native iOS app experience" },
  { name: "Android", icon: "🤖", description: "Native Android app experience" },
  { name: "Web", icon: "🌐", description: "Progressive Web App (PWA)" },
  { name: "Desktop", icon: "💻", description: "Desktop application support" },
];

const TechStack = () => {
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
            Technology Stack
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Built on modern technologies to provide the best experience for
            Flutter developers.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardContent className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{tech.icon}</div>
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${tech.color} opacity-20`}
                    ></div>
                  </div>

                  <h3 className="text-xl font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]">
                    {tech.name}
                  </h3>

                  <p className="text-theme-muted mb-4 font-[family-name:var(--font-epilogue)]">
                    {tech.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {tech.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-theme-primary rounded-full"></div>
                        <span className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Supported Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]">
                Supported Platforms
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {platforms.map((platform, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-3">{platform.icon}</div>
                    <h4 className="font-semibold text-theme-foreground mb-1 font-[family-name:var(--font-fraunces)]">
                      {platform.name}
                    </h4>
                    <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                      {platform.description}
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

export default TechStack;
