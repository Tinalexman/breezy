"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/stores";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-primary/95 backdrop-blur-sm border-b border-dark-surface-light">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-teal rounded-lg flex items-center justify-center">
              <span className="text-dark-primary font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-text-light">Breezy</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-text-muted hover:text-accent-teal transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-text-muted text-sm">
                  Welcome, {user?.name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-base bg-accent-teal text-dark-primary hover:bg-accent-teal/90 focus:ring-accent-teal shadow-lg hover:shadow-xl"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm">Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 text-text-muted hover:text-accent-teal"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-surface-light">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-text-muted hover:text-accent-teal transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-dark-surface-light">
                {isAuthenticated ? (
                  <>
                    <span className="text-text-muted text-sm">
                      Welcome, {user?.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                    <a
                      href="/dashboard"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-base bg-accent-teal text-dark-primary hover:bg-accent-teal/90 focus:ring-accent-teal shadow-lg hover:shadow-xl justify-start"
                    >
                      Dashboard
                    </a>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start">
                      Sign In
                    </Button>
                    <Button size="sm" className="justify-start">
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
