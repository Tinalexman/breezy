"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const TermsOfService = () => {
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
    { id: "acceptance", title: "Acceptance of Terms", icon: CheckCircleIcon },
    {
      id: "description",
      title: "Description of Service",
      icon: DocumentTextIcon,
    },
    { id: "accounts", title: "User Accounts", icon: ShieldCheckIcon },
    { id: "usage", title: "Acceptable Use", icon: CheckCircleIcon },
    {
      id: "content",
      title: "Content and Applications",
      icon: DocumentTextIcon,
    },
    {
      id: "availability",
      title: "Service Availability",
      icon: ShieldCheckIcon,
    },
    { id: "free", title: "Free Service", icon: CheckCircleIcon },
    { id: "privacy", title: "Privacy and Data", icon: ShieldCheckIcon },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: DocumentTextIcon,
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: ShieldCheckIcon,
    },
    { id: "termination", title: "Termination", icon: CheckCircleIcon },
    { id: "changes", title: "Changes to Terms", icon: DocumentTextIcon },
    { id: "contact", title: "Contact Information", icon: ShieldCheckIcon },
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
                    <DocumentTextIcon className="w-5 h-5 text-theme-primary" />
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
                      Terms of Service
                    </h1>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>

                  <div className="space-y-12 font-[family-name:var(--font-epilogue)]">
                    <section id="acceptance">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <CheckCircleIcon className="w-6 h-6 text-theme-primary" />
                        1. Acceptance of Terms
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          By accessing and using Breezy (&quot;the
                          Service&quot;), you accept and agree to be bound by
                          the terms and provision of this agreement. If you do
                          not agree to abide by the above, please do not use
                          this service.
                        </p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <p className="text-sm font-medium text-theme-foreground mb-2">
                            Important Notice:
                          </p>
                          <p className="text-sm">
                            These terms constitute a legally binding agreement
                            between you and Breezy. By using our service, you
                            acknowledge that you have read, understood, and
                            agree to be bound by these terms.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="description">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-theme-primary" />
                        2. Description of Service
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          Breezy is a platform that allows Flutter developers to
                          deploy and share their applications globally. The
                          Service includes:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                            <h4 className="font-semibold text-theme-foreground mb-2">
                              Core Features
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-theme-primary" />
                                Flutter app deployment and hosting
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-theme-primary" />
                                GitHub integration for repository management
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-theme-primary" />
                                Global CDN distribution
                              </li>
                            </ul>
                          </div>
                          <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                            <h4 className="font-semibold text-theme-foreground mb-2">
                              Advanced Features
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-theme-primary" />
                                Analytics and performance monitoring
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-theme-primary" />
                                Team collaboration features
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-theme-primary" />
                                Custom domain support
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="accounts">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
                        3. User Accounts
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>To use our Service, you must:</p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircleIcon className="w-5 h-5 text-theme-primary mt-0.5" />
                              <span>Be at least 13 years old</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircleIcon className="w-5 h-5 text-theme-primary mt-0.5" />
                              <span>Have a valid GitHub account</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircleIcon className="w-5 h-5 text-theme-primary mt-0.5" />
                              <span>
                                Provide accurate and complete information
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircleIcon className="w-5 h-5 text-theme-primary mt-0.5" />
                              <span>Maintain the security of your account</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircleIcon className="w-5 h-5 text-theme-primary mt-0.5" />
                              <span>
                                Accept responsibility for all activities under
                                your account
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section id="usage">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <CheckCircleIcon className="w-6 h-6 text-theme-primary" />
                        4. Acceptable Use
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>You agree not to use the Service to:</p>
                        <div className="bg-red-500/5 border border-red-500/20 p-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span>
                                Deploy applications that violate any laws or
                                regulations
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span>
                                Distribute malware, viruses, or harmful code
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span>
                                Infringe on intellectual property rights
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span>Harass, abuse, or harm others</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span>
                                Attempt to gain unauthorized access to our
                                systems
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span>
                                Use the Service for spam or unsolicited
                                communications
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section id="content">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-theme-primary" />
                        5. Content and Applications
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          You retain ownership of your applications and content.
                          By deploying applications through our Service, you
                          grant us a limited license to host and distribute your
                          applications as necessary to provide the Service.
                        </p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <p className="text-sm font-medium text-theme-foreground mb-2">
                            Your Responsibilities:
                          </p>
                          <p className="text-sm">
                            You are responsible for ensuring that your
                            applications comply with all applicable laws and do
                            not infringe on third-party rights.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="availability">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
                        6. Service Availability
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We strive to maintain high availability of our
                          Service, but we do not guarantee uninterrupted access.
                          We may temporarily suspend the Service for
                          maintenance, updates, or other operational reasons.
                        </p>
                        <div className="bg-yellow-500/5 border border-yellow-500/20 p-4">
                          <p className="text-sm font-medium text-theme-foreground mb-2">
                            Important Notice:
                          </p>
                          <p className="text-sm">
                            We are not liable for any damages resulting from
                            Service interruptions or downtime.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="free">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <CheckCircleIcon className="w-6 h-6 text-theme-primary" />
                        7. Free Service
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          Breezy is provided as a free service. We reserve the
                          right to modify or discontinue the Service at any time
                          without notice. We may introduce premium features in
                          the future, but core functionality will remain free.
                        </p>
                      </div>
                    </section>

                    <section id="privacy">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
                        8. Privacy and Data
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          Your privacy is important to us. Our collection and
                          use of personal information is governed by our Privacy
                          Policy, which is incorporated into these Terms by
                          reference.
                        </p>
                        <div className="bg-theme-card/30 p-4 border border-theme-border/50">
                          <p className="text-sm">
                            <a
                              href="/privacy-policy"
                              className="text-theme-primary hover:underline"
                            >
                              Read our Privacy Policy →
                            </a>
                          </p>
                        </div>
                      </div>
                    </section>

                    <section id="intellectual">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-theme-primary" />
                        9. Intellectual Property
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          The Service and its original content, features, and
                          functionality are owned by Breezy and are protected by
                          international copyright, trademark, patent, trade
                          secret, and other intellectual property laws.
                        </p>
                      </div>
                    </section>

                    <section id="liability">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
                        10. Limitation of Liability
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          In no event shall Breezy be liable for any indirect,
                          incidental, special, consequential, or punitive
                          damages, including without limitation, loss of
                          profits, data, use, goodwill, or other intangible
                          losses.
                        </p>
                      </div>
                    </section>

                    <section id="termination">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <CheckCircleIcon className="w-6 h-6 text-theme-primary" />
                        11. Termination
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We may terminate or suspend your account and bar
                          access to the Service immediately, without prior
                          notice or liability, under our sole discretion, for
                          any reason whatsoever and without limitation.
                        </p>
                      </div>
                    </section>

                    <section id="changes">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-theme-primary" />
                        12. Changes to Terms
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          We reserve the right to modify or replace these Terms
                          at any time. If a revision is material, we will
                          provide at least 30 days notice prior to any new terms
                          taking effect.
                        </p>
                      </div>
                    </section>

                    <section id="contact">
                      <h2 className="text-2xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
                        13. Contact Information
                      </h2>
                      <div className="space-y-4 text-theme-muted leading-relaxed">
                        <p>
                          If you have any questions about these Terms of
                          Service, please contact us:
                        </p>
                        <div className="bg-theme-card/30 p-6 border border-theme-border/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-theme-foreground mb-1">
                                Email:
                              </p>
                              <p className="text-theme-primary">
                                legal@breezy.dev
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-theme-foreground mb-1">
                                Support:
                              </p>
                              <p className="text-theme-primary">
                                support@breezy.dev
                              </p>
                            </div>
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

export default TermsOfService;
