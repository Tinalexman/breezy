"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { motion } from "framer-motion";
import Footer from "@/components/reusable/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-theme-background text-theme-foreground">
      {/* Header with theme toggle */}
      <header className="border-b border-theme-border bg-theme-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold text-theme-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Breezy
          </motion.h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-theme-foreground font-[family-name:var(--font-fraunces)]">
            Welcome to Breezy
          </h2>
          <p className="text-lg text-theme-muted max-w-2xl mx-auto font-[family-name:var(--font-epilogue)]">
            Share your Flutter applications with the world. Experience our
            beautiful theme system with an amazing peel effect when switching
            between light and dark modes.
          </p>
        </motion.div>

        {/* Theme demonstration cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card hover>
              <CardHeader>
                <h3 className="text-xl font-semibold text-theme-foreground">
                  Primary Button
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-theme-muted mb-4">
                  This button uses the primary theme color with smooth
                  animations.
                </p>
                <Button variant="primary" size="md">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card hover>
              <CardHeader>
                <h3 className="text-xl font-semibold text-theme-foreground">
                  Secondary Button
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-theme-muted mb-4">
                  Secondary buttons use the secondary theme color.
                </p>
                <Button variant="secondary" size="md">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card hover>
              <CardHeader>
                <h3 className="text-xl font-semibold text-theme-foreground">
                  Outline Button
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-theme-muted mb-4">
                  Outline buttons have a subtle border with hover effects.
                </p>
                <Button variant="outline" size="md">
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Color palette demonstration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold text-theme-foreground">
                Theme Colors
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-theme-primary rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-theme-foreground">
                    Primary
                  </p>
                  <p className="text-xs text-theme-muted">
                    Light Blue / Deep Blue
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-theme-secondary rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-theme-foreground">
                    Secondary
                  </p>
                  <p className="text-xs text-theme-muted">
                    Light Gray / Dark Gray
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-theme-background border border-theme-border rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-theme-foreground">
                    Background
                  </p>
                  <p className="text-xs text-theme-muted">White / #131313</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-theme-border rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-theme-foreground">
                    Border
                  </p>
                  <p className="text-xs text-theme-muted">
                    Light Gray / Dark Gray
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <Card>
            <CardContent>
              <h3 className="text-2xl font-bold text-theme-foreground mb-4">
                Ready to get started?
              </h3>
              <p className="text-theme-muted mb-6">
                Experience the power of our theme system with an amazing peel
                effect and beautiful animations.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Start Building
                </Button>
                <Button variant="outline" size="lg">
                  View Examples
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
