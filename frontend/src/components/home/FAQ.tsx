"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { useState } from "react";

const faqs = [
  {
    question: "What is Breezy?",
    answer:
      "Breezy is a platform that allows Flutter developers to deploy and share their applications globally. You can deploy your Flutter apps with just a few clicks and share them with anyone via a unique URL.",
  },
  {
    question: "Is Breezy really free?",
    answer:
      "Yes! Breezy is completely free to use with no hidden fees, no pricing tiers, and no limitations. We believe in making Flutter app deployment accessible to all developers.",
  },
  {
    question: "What Flutter versions are supported?",
    answer:
      "We support all recent Flutter versions including Flutter 3.x and above. Our platform automatically detects your Flutter version and builds accordingly.",
  },
  {
    question: "Can I deploy private repositories?",
    answer:
      "Yes, you can deploy both public and private GitHub repositories. We use secure OAuth authentication to access your repositories safely.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "Most deployments complete in under 2 minutes. The time depends on your app size and complexity, but we optimize the build process for speed.",
  },
  {
    question: "Can users install my app on their devices?",
    answer:
      "Your deployed app runs directly in the browser as a Progressive Web App (PWA). Users can access it instantly without any installation required.",
  },
  {
    question: "Do you provide analytics?",
    answer:
      "Yes! We provide comprehensive analytics including user engagement, performance metrics, and real-time data to help you understand how your app is being used.",
  },
  {
    question: "Is my app data secure?",
    answer:
      "Absolutely. We use enterprise-grade security with SSL encryption, secure deployments, and privacy protection. Your app and data are completely secure.",
  },
  {
    question: "Can I use custom domains?",
    answer:
      "Yes, you can use custom domains for your deployed apps. This allows you to maintain your brand identity and provide a professional experience.",
  },
  {
    question: "What if I need help or support?",
    answer:
      "We provide priority support for all users. You can reach our team through the contact form or community channels for any assistance you need.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Everything you need to know about deploying your Flutter apps with
            Breezy.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card
                  hover
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]">
                          {faq.question}
                        </h3>
                        <AnimatePresence>
                          {openIndex === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="text-theme-muted font-[family-name:var(--font-epilogue)] leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-theme-border flex items-center justify-center text-theme-muted hover:text-theme-foreground hover:border-theme-foreground transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          initial={false}
                          animate={{ rotate: openIndex === index ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg font-bold"
                        >
                          {openIndex === index ? "×" : "+"}
                        </motion.span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                Still Have Questions?
              </h3>
              <p className="text-theme-muted mb-6 max-w-2xl mx-auto font-[family-name:var(--font-epilogue)]">
                Can&apos;t find what youre looking for? Our team is here to help
                you get started with Breezy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-theme-primary text-white font-semibold hover:bg-theme-primary/90 transition-colors duration-200"
                >
                  Contact Support
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-theme-border text-theme-foreground font-semibold hover:bg-theme-background/50 transition-colors duration-200"
                >
                  View Documentation
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
