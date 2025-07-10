"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const TermsOfService = () => {
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
                Terms of Service
              </h1>
              <p className="text-theme-muted mb-8 font-[family-name:var(--font-epilogue)]">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <div className="space-y-8 font-[family-name:var(--font-epilogue)]">
                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    1. Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      By accessing and using Breezy (&quot;the Service&quot;),
                      you accept and agree to be bound by the terms and
                      provision of this agreement. If you do not agree to abide
                      by the above, please do not use this service.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    2. Description of Service
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      Breezy is a platform that allows Flutter developers to
                      deploy and share their applications globally. The Service
                      includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Flutter app deployment and hosting</li>
                      <li>GitHub integration for repository management</li>
                      <li>Global CDN distribution</li>
                      <li>Analytics and performance monitoring</li>
                      <li>Team collaboration features</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    3. User Accounts
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>To use our Service, you must:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Be at least 13 years old</li>
                      <li>Have a valid GitHub account</li>
                      <li>Provide accurate and complete information</li>
                      <li>Maintain the security of your account</li>
                      <li>
                        Accept responsibility for all activities under your
                        account
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    4. Acceptable Use
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>You agree not to use the Service to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        Deploy applications that violate any laws or regulations
                      </li>
                      <li>Distribute malware, viruses, or harmful code</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Harass, abuse, or harm others</li>
                      <li>
                        Attempt to gain unauthorized access to our systems
                      </li>
                      <li>
                        Use the Service for spam or unsolicited communications
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    5. Content and Applications
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      You retain ownership of your applications and content. By
                      deploying applications through our Service, you grant us a
                      limited license to host and distribute your applications
                      as necessary to provide the Service.
                    </p>
                    <p>
                      You are responsible for ensuring that your applications
                      comply with all applicable laws and do not infringe on
                      third-party rights.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    6. Service Availability
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We strive to maintain high availability of our Service,
                      but we do not guarantee uninterrupted access. We may
                      temporarily suspend the Service for maintenance, updates,
                      or other operational reasons.
                    </p>
                    <p>
                      We are not liable for any damages resulting from Service
                      interruptions or downtime.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    7. Free Service
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      Breezy is provided as a free service. We reserve the right
                      to modify or discontinue the Service at any time without
                      notice. We may introduce premium features in the future,
                      but core functionality will remain free.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    8. Privacy and Data
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      Your privacy is important to us. Our collection and use of
                      personal information is governed by our Privacy Policy,
                      which is incorporated into these Terms by reference.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    9. Intellectual Property
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      The Service and its original content, features, and
                      functionality are owned by Breezy and are protected by
                      international copyright, trademark, patent, trade secret,
                      and other intellectual property laws.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    10. Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      To the maximum extent permitted by law, Breezy shall not
                      be liable for any indirect, incidental, special,
                      consequential, or punitive damages, including without
                      limitation, loss of profits, data, use, goodwill, or other
                      intangible losses.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    11. Termination
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We may terminate or suspend your account and access to the
                      Service immediately, without prior notice, for any reason,
                      including breach of these Terms.
                    </p>
                    <p>
                      Upon termination, your right to use the Service will cease
                      immediately, and we may delete your account and data.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    12. Changes to Terms
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      We reserve the right to modify these Terms at any time. We
                      will notify users of any material changes by posting the
                      new Terms on this page and updating the &quot;Last
                      updated&quot; date.
                    </p>
                    <p>
                      Your continued use of the Service after any changes
                      constitutes acceptance of the new Terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    13. Governing Law
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      These Terms shall be governed by and construed in
                      accordance with the laws of [Your Jurisdiction], without
                      regard to its conflict of law provisions.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    14. Contact Information
                  </h2>
                  <div className="space-y-4 text-theme-muted">
                    <p>
                      If you have any questions about these Terms of Service,
                      please contact us at:
                    </p>
                    <div className="bg-theme-background/50 p-4 rounded border border-theme-border">
                      <p className="font-medium text-theme-foreground">
                        Email:
                      </p>
                      <p className="text-theme-primary">legal@breezy.dev</p>
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

export default TermsOfService;
