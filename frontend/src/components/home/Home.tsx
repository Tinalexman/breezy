import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
} from "@/components/ui";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Testimonials from "./Testimonials";
import Benefits from "./Benefits";
import DemoSection from "./DemoSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-surface to-dark-primary"></div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-text-light animate-fade-in">
              Share Your Flutter Apps
              <span className="block text-accent-teal">Instantly</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto animate-slide-up">
              Transform your Flutter mobile applications into interactive web
              experiences. No downloads required, just instant access for
              anyone, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Started for Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                See a Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-light mb-6">
                The Problem with App Sharing
              </h2>
              <div className="space-y-4 text-text-muted">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-error-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-error-red"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Users need to download and install your app</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-error-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-error-red"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Platform-specific builds and distribution</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-error-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-error-red"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Complex setup instructions for clients</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-text-light mb-6">
                The Breezy Solution
              </h2>
              <div className="space-y-4 text-text-muted">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-success-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-success-green"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Instant web access with a single link</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-success-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-success-green"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Automatic web compilation from your Flutter code</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-success-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-success-green"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Zero setup required for your audience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoSection />
      {/* How It Works Section */}
      <section className="py-20 bg-dark-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-light mb-4">
              How It Works
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Three simple steps to share your Flutter app with the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <CardTitle>Connect GitHub</CardTitle>
                <CardDescription>
                  Link your Flutter project repository and we'll handle the rest
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                </div>
                <CardTitle>Automated Web Build</CardTitle>
                <CardDescription>
                  Our platform automatically compiles your Flutter app for the
                  web
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </div>
                <CardTitle>Share & Experience</CardTitle>
                <CardDescription>
                  Get a public URL to share your app instantly with anyone
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Benefits />

      {/* Demo Section */}
      <DemoSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-20 bg-dark-primary">
        <div className="container mx-auto px-4 text-center">
          <Card variant="elevated" className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of Flutter developers sharing their apps with the
                world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  helperText="We'll send you a link to get started"
                />
                <Button size="lg" className="w-full">
                  Start Building Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
