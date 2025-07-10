import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Status", href: "#" },
        { name: "Security", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-theme-border bg-theme-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-theme-primary mb-4 font-[family-name:var(--font-fraunces)]">
                Breezy
              </h3>
              <p className="text-theme-muted mb-6 max-w-md font-[family-name:var(--font-epilogue)]">
                Share your Flutter applications with the world. Built for
                developers, designed for success.
              </p>
              <div className="flex gap-4">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
                <Button variant="outline" size="sm">
                  View Demo
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-theme-muted hover:text-theme-foreground transition-colors duration-200 text-sm font-[family-name:var(--font-epilogue)]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-theme-border pt-8 mb-8"
        >
          <div className="text-center">
            <h4 className="text-xl font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
              Stay Updated
            </h4>
            <p className="text-theme-muted mb-6 max-w-md mx-auto font-[family-name:var(--font-epilogue)]">
              Get the latest updates on new features, tutorials, and Flutter
              development tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-theme-border bg-theme-background text-theme-foreground placeholder-theme-muted focus:outline-none focus:border-theme-primary transition-colors duration-200 font-[family-name:var(--font-epilogue)]"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-theme-border pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-theme-muted text-sm font-[family-name:var(--font-epilogue)]">
              &copy; {currentYear} Breezy. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-theme-muted hover:text-theme-foreground transition-colors duration-200 text-sm font-[family-name:var(--font-epilogue)]"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-theme-muted hover:text-theme-foreground transition-colors duration-200 text-sm font-[family-name:var(--font-epilogue)]"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-theme-muted hover:text-theme-foreground transition-colors duration-200 text-sm font-[family-name:var(--font-epilogue)]"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
