"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import {
  UserIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  CogIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export const UserProfile = () => {
  const { user, logout, isLoading } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!user) return null;

  const stats = [
    { label: "Projects", value: "12", icon: "📱", color: "text-blue-500" },
    { label: "Deployments", value: "8", icon: "🚀", color: "text-green-500" },
    { label: "Views", value: "1.2K", icon: "👁️", color: "text-purple-500" },
  ];

  const quickActions = [
    { label: "New Project", icon: SparklesIcon, color: "text-blue-500" },
    { label: "Analytics", icon: ChartBarIcon, color: "text-green-500" },
    { label: "Settings", icon: CogIcon, color: "text-purple-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="relative overflow-hidden border-0 shadow-2xl">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-accent/5" />

        <CardContent className="p-6 relative">
          {/* User Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-theme-primary to-theme-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
              )}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
              />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                {user.username}
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mt-1"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Online
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* User Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 mb-6"
          >
            <div className="flex items-center gap-3 p-3 bg-theme-secondary/30 rounded-xl">
              <EnvelopeIcon className="w-5 h-5 text-theme-muted flex-shrink-0" />
              <span className="font-[family-name:var(--font-epilogue)] text-theme-foreground">
                {user.email}
              </span>
            </div>

            {user.username && (
              <div className="flex items-center gap-3 p-3 bg-theme-secondary/30 rounded-xl">
                <GlobeAltIcon className="w-5 h-5 text-theme-muted flex-shrink-0" />
                <span className="font-[family-name:var(--font-epilogue)] text-theme-foreground">
                  github.com/{user.username}
                </span>
              </div>
            )}
          </motion.div>

          {/* Account Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-br from-theme-secondary/50 to-theme-secondary/20 rounded-xl border border-theme-border/50"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
                  {stat.value}
                </div>
                <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6"
          >
            <h4 className="text-sm font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]">
              Quick Actions
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-theme-secondary/30 rounded-xl border border-theme-border/50 hover:bg-theme-secondary/50 transition-colors"
                >
                  <action.icon
                    className={`w-5 h-5 ${action.color} mx-auto mb-1`}
                  />
                  <div className="text-xs text-theme-foreground font-[family-name:var(--font-epilogue)]">
                    {action.label}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              onClick={() => (window.location.href = "/projects")}
            >
              <SparklesIcon className="w-5 h-5" />
              View Dashboard
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={logout}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold group"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {isLoading ? "Signing out..." : "Sign Out"}
            </Button>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20"
          >
            <div className="flex items-start gap-3">
              <SparklesIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-theme-foreground mb-1 font-[family-name:var(--font-fraunces)]">
                  Secure Session
                </p>
                <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Your session is encrypted and secure. You can revoke access at
                  any time from your GitHub settings.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Expandable Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full text-center text-sm text-theme-muted hover:text-theme-foreground transition-colors font-[family-name:var(--font-epilogue)]"
            >
              {isExpanded ? "Show less" : "Show more details"}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-theme-border/50 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                        User ID:
                      </span>
                      <span className="text-theme-foreground font-mono">
                        {user.id}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                        Account Status:
                      </span>
                      <span className="text-green-500 font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
