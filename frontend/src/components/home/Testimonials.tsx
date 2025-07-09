import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Flutter Developer",
      company: "TechCorp",
      content:
        "Breezy made sharing my Flutter app incredibly easy. No more explaining how to install or set up - just send a link!",
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "Mobile App Developer",
      company: "StartupXYZ",
      content:
        "The automated build process is a game-changer. I can focus on development while Breezy handles the web deployment.",
      avatar: "MR",
    },
    {
      name: "Emily Watson",
      role: "UI/UX Designer",
      company: "Design Studio",
      content:
        "Perfect for client demos! They can instantly see and interact with our Flutter prototypes without any technical setup.",
      avatar: "EW",
    },
  ];

  return (
    <section className="py-20 bg-dark-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-light mb-4">
            Loved by Flutter Developers
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            See what developers are saying about Breezy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} variant="elevated" className="relative">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-teal font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-text-light mb-4 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="text-text-light font-semibold">
                        {testimonial.name}
                      </p>
                      <CardDescription>
                        {testimonial.role} at {testimonial.company}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-muted mb-4">
            Join thousands of developers already using Breezy
          </p>
          <div className="flex justify-center space-x-8 text-text-dim">
            <span className="flex items-center">
              <svg
                className="w-5 h-5 text-success-green mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              99.9% Uptime
            </span>
            <span className="flex items-center">
              <svg
                className="w-5 h-5 text-success-green mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Instant Deployments
            </span>
            <span className="flex items-center">
              <svg
                className="w-5 h-5 text-success-green mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Free Tier Available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
