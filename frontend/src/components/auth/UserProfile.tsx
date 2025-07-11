"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import {
  UserIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const UserProfile = () => {
  const { user, logout, isLoading } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card>
        <CardContent className="p-6">
          {/* User Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-theme-primary to-theme-accent flex items-center justify-center text-white text-2xl font-bold"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-8 h-8" />
              )}
            </motion.div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                {user.name}
              </h3>
              <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                {user.githubUsername && `@${user.githubUsername}`}
              </p>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-theme-muted">
              <EnvelopeIcon className="w-5 h-5" />
              <span className="font-[family-name:var(--font-epilogue)]">
                {user.email}
              </span>
            </div>

            {user.githubUsername && (
              <div className="flex items-center gap-3 text-theme-muted">
                <GlobeAltIcon className="w-5 h-5" />
                <span className="font-[family-name:var(--font-epilogue)]">
                  github.com/{user.githubUsername}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 text-theme-muted">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="font-[family-name:var(--font-epilogue)]">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-theme-secondary/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
                12
              </div>
              <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
                8
              </div>
              <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                Deployments
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
                1.2K
              </div>
              <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                Views
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => (window.location.href = "/projects")}
            >
              View Dashboard
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={logout}
              disabled={isLoading}
              className="w-full group"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {isLoading ? "Signing out..." : "Sign Out"}
            </Button>
          </div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-theme-secondary/50 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">🔒</span>
              <div className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                <p className="font-semibold text-theme-foreground mb-1">
                  Secure Session
                </p>
                <p>
                  Your session is encrypted and secure. You can revoke access at
                  any time from your GitHub settings.
                </p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
