import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-theme-border bg-theme-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-theme-primary mb-4 font-[family-name:var(--font-fraunces)]">
                Breezy
              </h3>
              <p className="text-theme-muted mb-6 font-[family-name:var(--font-epilogue)]">
                Share your Flutter applications with the world. Built for
                developers, designed for success. Completely free to use.
              </p>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                Stay Updated
              </h4>
              <p className="text-theme-muted mb-6 font-[family-name:var(--font-epilogue)]">
                Get the latest updates on new features, tutorials, and Flutter
                development tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-theme-border bg-theme-background text-theme-foreground placeholder-theme-muted focus:outline-none focus:border-theme-primary transition-colors duration-200 font-[family-name:var(--font-epilogue)]"
                />
                <Button variant="primary" size="md">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

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
