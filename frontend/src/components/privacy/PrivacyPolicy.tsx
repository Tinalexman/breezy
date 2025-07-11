"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const PrivacyPolicy = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  const handleBack = () => {
    router.back();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: "collection", title: "Information We Collect", icon: UserIcon },
    { id: "usage", title: "How We Use Information", icon: EyeIcon },
    { id: "sharing", title: "Information Sharing", icon: ShieldCheckIcon },
    { id: "security", title: "Data Security", icon: LockClosedIcon },
    { id: "rights", title: "Your Rights", icon: UserIcon },
    { id: "cookies", title: "Cookies and Tracking", icon: EyeIcon },
    { id: "children", title: "Children's Privacy", icon: ShieldCheckIcon },
    { id: "changes", title: "Changes to Policy", icon: LockClosedIcon },
    { id: "contact", title: "Contact Us", icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-background via-theme-background to-theme-card/20">
      {/* Header */}
      <header className="border-b border-theme-border bg-theme-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 text-theme-muted hover:text-theme-foreground transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-24"
            >
              <Card className="backdrop-blur-sm border-theme-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)] flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-theme-primary" />
                    Contents
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left p-3 transition-all duration-200 flex items-center gap-3 group ${
                          activeSection === section.id
                            ? "bg-theme-primary/10 text-theme-primary border border-theme-primary/20"
                            : "text-theme-muted hover:text-theme-foreground hover:bg-theme-card/50"
                        }`}
                      >
                        <section.icon className="w-4 h-4" />
                        <span className="text-sm font-medium font-[family-name:var(--font-epilogue)]">
                          {section.title}
                        </span>
                      </motion.button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="backdrop-blur-sm border-theme-border/50">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                    >
                      <Image
                        src="/breezy.png"
                        alt="Breezy"
                        width={64}
                        height={64}
                        className="size-16"
                      />
                    </motion.div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                      Privacy Policy
                    </h1>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>

                  <div className="space-y-12 font-[family-name:var(--font-epilogue)]">
                    <section id="collection">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <UserIcon className="w-6 h-6 text-theme-primary" />
                        1. Information We Collect
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We collect information you provide directly to us,
                          such as when you create an account, deploy an
                          application, or contact us for support.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                            <h4 className="font-semibold text-theme-foreground mb-3">
                              Account Information
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                                Name and email address
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                                GitHub username and profile
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                                Account preferences and settings
                              </li>
                            </ul>
                          </div>
                          <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                            <h4 className="font-semibold text-theme-foreground mb-3">
                              Service Data
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                                Repository information and deployment data
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                                Usage analytics and performance metrics
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                                Communication records and support requests
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="usage">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <EyeIcon className="w-6 h-6 text-theme-primary" />
                        2. How We Use Your Information
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>We use the information we collect to:</p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Provide, maintain, and improve our services
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Process deployments and manage your applications
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Send you technical notices and support messages
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Respond to your comments and questions
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Monitor and analyze usage patterns and trends
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section id="sharing">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
                        3. Information Sharing
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We do not sell, trade, or otherwise transfer your
                          personal information to third parties except in the
                          following circumstances:
                        </p>
                        <div className="bg-green-500/5 border border-green-500/20 p-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <span>With your explicit consent</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <span>To comply with legal obligations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <span>To protect our rights and safety</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <span>
                                With service providers who assist in our
                                operations
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section id="security">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <LockClosedIcon className="w-6 h-6 text-theme-primary" />
                        4. Data Security
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We implement appropriate security measures to protect
                          your personal information against unauthorized access,
                          alteration, disclosure, or destruction.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                            <h4 className="font-semibold text-theme-foreground mb-3">
                              Technical Measures
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4 text-theme-primary" />
                                SSL encryption for all data transmission
                              </li>
                              <li className="flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4 text-theme-primary" />
                                Secure authentication via GitHub OAuth
                              </li>
                              <li className="flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4 text-theme-primary" />
                                Regular security audits and monitoring
                              </li>
                            </ul>
                          </div>
                          <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                            <h4 className="font-semibold text-theme-foreground mb-3">
                              Operational Measures
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4 text-theme-primary" />
                                Access controls and data backup procedures
                              </li>
                              <li className="flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4 text-theme-primary" />
                                Employee training on data protection
                              </li>
                              <li className="flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4 text-theme-primary" />
                                Incident response procedures
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="rights">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <UserIcon className="w-6 h-6 text-theme-primary" />
                        5. Your Rights
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>You have the right to:</p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Access and review your personal information
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>Request correction of inaccurate data</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Request deletion of your account and data
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>
                                Opt-out of non-essential communications
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-theme-primary rounded-full mt-2"></div>
                              <span>Export your data in a portable format</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section id="cookies">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <EyeIcon className="w-6 h-6 text-theme-primary" />
                        6. Cookies and Tracking
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We use cookies and similar technologies to enhance
                          your experience, analyze usage, and provide
                          personalized content. You can control cookie settings
                          through your browser.
                        </p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <p className="text-sm font-medium text-theme-foreground mb-2">
                            Cookie Types:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-1">
                                Essential Cookies
                              </p>
                              <p className="text-theme-muted">
                                Required for basic site functionality
                              </p>
                            </div>
                            <div>
                              <p className="font-medium mb-1">
                                Analytics Cookies
                              </p>
                              <p className="text-theme-muted">
                                Help us understand how you use our service
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="children">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
                        7. Children&apos;s Privacy
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          Our services are not intended for children under 13.
                          We do not knowingly collect personal information from
                          children under 13.
                        </p>
                        <div className="bg-yellow-500/5 border border-yellow-500/20 p-4">
                          <p className="text-sm font-medium text-theme-foreground mb-2">
                            Important Notice:
                          </p>
                          <p className="text-sm">
                            If you are a parent or guardian and believe your
                            child has provided us with personal information,
                            please contact us immediately.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="changes">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <LockClosedIcon className="w-6 h-6 text-theme-primary" />
                        8. Changes to This Policy
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We may update this Privacy Policy from time to time.
                          We will notify you of any material changes by posting
                          the new policy on this page and updating the
                          &quot;Last updated&quot; date.
                        </p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <p className="text-sm font-medium text-theme-foreground mb-2">
                            Notification Process:
                          </p>
                          <p className="text-sm">
                            For significant changes, we may also send you an
                            email notification or display a prominent notice on
                            our website.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="contact">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <UserIcon className="w-6 h-6 text-theme-primary" />
                        9. Contact Us
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          If you have any questions about this Privacy Policy,
                          please contact us:
                        </p>
                        <div className="bg-theme-card/30 p-6 border border-theme-border/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-theme-foreground mb-1">
                                Privacy Team:
                              </p>
                              <p className="text-theme-primary">
                                privacy@breezy.dev
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-theme-foreground mb-1">
                                General Support:
                              </p>
                              <p className="text-theme-primary">
                                support@breezy.dev
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-theme-border/50">
                            <p className="text-sm text-theme-muted">
                              We typically respond to privacy-related inquiries
                              within 48 hours.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
