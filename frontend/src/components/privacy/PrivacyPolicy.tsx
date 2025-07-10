"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const PrivacyPolicy = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-theme-background">
      {/* Header */}
      <header className="border-b border-theme-border bg-theme-background">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 text-theme-muted hover:text-theme-foreground"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-8 max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-theme-foreground mb-8 font-[family-name:var(--font-fraunces)]">
                Privacy Policy
              </h1>
              <p className="text-theme-muted mb-8 font-[family-name:var(--font-epilogue)]">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <div className="space-y-8 font-[family-name:var(--font-epilogue)]">
                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    1. Information We Collect
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We collect information you provide directly to us, such as
                      when you create an account, deploy an application, or
                      contact us for support.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        Account information (name, email address, GitHub
                        username)
                      </li>
                      <li>Repository information and deployment data</li>
                      <li>Usage analytics and performance metrics</li>
                      <li>Communication records and support requests</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    2. How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process deployments and manage your applications</li>
                      <li>Send you technical notices and support messages</li>
                      <li>Respond to your comments and questions</li>
                      <li>Monitor and analyze usage patterns and trends</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    3. Information Sharing
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties except in the following
                      circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>With your explicit consent</li>
                      <li>To comply with legal obligations</li>
                      <li>To protect our rights and safety</li>
                      <li>
                        With service providers who assist in our operations
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    4. Data Security
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We implement appropriate security measures to protect your
                      personal information against unauthorized access,
                      alteration, disclosure, or destruction.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>SSL encryption for all data transmission</li>
                      <li>Secure authentication via GitHub OAuth</li>
                      <li>Regular security audits and monitoring</li>
                      <li>Access controls and data backup procedures</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    5. Your Rights
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Access and review your personal information</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your account and data</li>
                      <li>Opt-out of non-essential communications</li>
                      <li>Export your data in a portable format</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    6. Cookies and Tracking
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We use cookies and similar technologies to enhance your
                      experience, analyze usage, and provide personalized
                      content. You can control cookie settings through your
                      browser.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    7. Children&apos;s Privacy
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      Our services are not intended for children under 13. We do
                      not knowingly collect personal information from children
                      under 13.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    8. Changes to This Policy
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We may update this Privacy Policy from time to time. We
                      will notify you of any material changes by posting the new
                      policy on this page and updating the &quot;Last
                      updated&quot; date.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    9. Contact Us
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      If you have any questions about this Privacy Policy,
                      please contact us at:
                    </p>
                    <div className="bg-theme-background/50 p-4 rounded border border-theme-border">
                      <p className="font-medium text-theme-foreground">
                        Email:
                      </p>
                      <p className="text-theme-primary">privacy@breezy.dev</p>
                      <p className="font-medium text-theme-foreground mt-2">
                        Address:
                      </p>
                      <p>
                        Breezy Development Team
                        <br />
                        [Your Company Address]
                        <br />
                        [City, State, ZIP]
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
