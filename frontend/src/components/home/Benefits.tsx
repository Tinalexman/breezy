import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";

const Benefits = () => {
  const benefits = [
    {
      title: "Instant Accessibility",
      description:
        "Share your Flutter app with a single link. No downloads, no installations, just instant access.",
      icon: (
        <svg
          className="w-8 h-8 text-accent-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "True Cross-Platform Showcase",
      description:
        "Your Flutter app runs natively on web, maintaining the same look and feel across all devices.",
      icon: (
        <svg
          className="w-8 h-8 text-accent-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Effortless Deployment",
      description:
        "Connect your GitHub repo and we handle the rest. Automatic builds on every push.",
      icon: (
        <svg
          className="w-8 h-8 text-accent-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Real-time Collaboration",
      description:
        "Share progress with clients and team members instantly. Get feedback in real-time.",
      icon: (
        <svg
          className="w-8 h-8 text-accent-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Analytics & Insights",
      description:
        "Track how users interact with your app. Get valuable insights to improve your product.",
      icon: (
        <svg
          className="w-8 h-8 text-accent-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Custom Domains",
      description:
        "Use your own domain for a professional look. Perfect for client presentations and demos.",
      icon: (
        <svg
          className="w-8 h-8 text-accent-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-light mb-4">
            Why Choose Breezy?
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Everything you need to share your Flutter apps with the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              variant="elevated"
              className="group hover:scale-105 transition-transform duration-200"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-accent-teal/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-teal/30 transition-colors duration-200">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-accent-teal/10 to-accent-purple/10 rounded-2xl p-8 border border-accent-teal/20">
            <h3 className="text-2xl font-bold text-text-light mb-4">
              Ready to Transform Your Flutter Workflow?
            </h3>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              Join thousands of developers who are already sharing their Flutter
              apps with the world. Start building, deploying, and sharing in
              minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-teal text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent-teal/90 transition-colors duration-200">
                Get Started for Free
              </button>
              <button className="border border-accent-teal text-accent-teal px-8 py-3 rounded-lg font-semibold hover:bg-accent-teal hover:text-dark-primary transition-colors duration-200">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
