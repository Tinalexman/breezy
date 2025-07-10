"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const supportChannels = [
    {
      title: "Email Support",
      description: "Get help via email",
      icon: "📧",
      contact: "support@breezy.dev",
    },
    {
      title: "Community",
      description: "Join our developer community",
      icon: "👥",
      contact: "Discord Server",
    },
    {
      title: "Documentation",
      description: "Browse our comprehensive docs",
      icon: "📚",
      contact: "docs.breezy.dev",
    },
    {
      title: "Status Page",
      description: "Check platform status",
      icon: "📊",
      contact: "status.breezy.dev",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-theme-background">
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
            Get in Touch
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Have questions or need help? We're here to support you on your
            Flutter deployment journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-theme-border bg-theme-background text-theme-foreground placeholder-theme-muted focus:outline-none focus:border-theme-primary transition-colors duration-200 font-[family-name:var(--font-epilogue)]"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-theme-border bg-theme-background text-theme-foreground placeholder-theme-muted focus:outline-none focus:border-theme-primary transition-colors duration-200 font-[family-name:var(--font-epilogue)]"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-theme-border bg-theme-background text-theme-foreground focus:outline-none focus:border-theme-primary transition-colors duration-200 font-[family-name:var(--font-epilogue)]"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-theme-border bg-theme-background text-theme-foreground placeholder-theme-muted focus:outline-none focus:border-theme-primary transition-colors duration-200 font-[family-name:var(--font-epilogue)]"
                      placeholder="Tell us how we can help..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Channels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]">
                  Other Ways to Connect
                </h3>
                <p className="text-theme-muted mb-8 font-[family-name:var(--font-epilogue)]">
                  Choose the support channel that works best for you. We're here
                  to help you succeed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportChannels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card hover>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{channel.icon}</div>
                          <div>
                            <h4 className="font-semibold text-theme-foreground mb-1 font-[family-name:var(--font-fraunces)]">
                              {channel.title}
                            </h4>
                            <p className="text-sm text-theme-muted mb-2 font-[family-name:var(--font-epilogue)]">
                              {channel.description}
                            </p>
                            <div className="text-theme-primary font-medium font-[family-name:var(--font-epilogue)]">
                              {channel.contact}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl mb-3">⚡</div>
                      <h4 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                        Fast Response Time
                      </h4>
                      <p className="text-theme-muted text-sm font-[family-name:var(--font-epilogue)]">
                        We typically respond within 2-4 hours during business
                        hours.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
