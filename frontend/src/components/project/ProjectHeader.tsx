"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PlusIcon, BellIcon, UserIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationSidebar from "@/components/project/NotificationSidebar";
import NewProjectModal from "@/components/project/NewProjectModal";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

interface ProjectHeaderProps {
  title?: string;
  subtitle?: string;
  showNewProjectButton?: boolean;
}

const ProjectHeader = ({
  title,
  subtitle,
  showNewProjectButton = true,
}: ProjectHeaderProps) => {
  const [greeting, setGreeting] = useState({ header: "", subText: "" });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Generate random avatar URL
  const generateAvatarUrl = () => {
    return `https://api.dicebear.com/9.x/avataaars/png?seed=${faker.string.uuid()}`;
  };

  useEffect(() => {
    setAvatarUrl(generateAvatarUrl());
  }, []);

  // Greeting function that randomizes between different greetings based on time of day
  const getRandomGreeting = () => {
    const hour = new Date().getHours();
    let timeOfDay = "";

    if (hour >= 5 && hour < 12) {
      timeOfDay = "morning";
    } else if (hour >= 12 && hour < 17) {
      timeOfDay = "afternoon";
    } else if (hour >= 17 && hour < 21) {
      timeOfDay = "evening";
    } else {
      timeOfDay = "night";
    }

    const headers = [
      "😍",
      "🥳",
      "🥰",
      "😎",
      "🤗",
      "🙃",
      "🙂",
      "😇",
      "😝",
      "🤪",
      "🤓",
      "🤩",
    ];

    const subTextGreetings = {
      morning: [
        "Good morning! Ready to build something amazing today?",
        "Rise and shine! Your projects are waiting for you.",
        "Morning! Let's make today productive.",
        "Good morning! Time to create something wonderful.",
        "Welcome to a new day of development!",
      ],
      afternoon: [
        "Good afternoon! How are your projects coming along?",
        "Afternoon! Perfect time to check on your apps.",
        "Good afternoon! Let's see what we can accomplish.",
        "Afternoon vibes! Your projects are looking great.",
        "Good afternoon! Ready for some coding magic?",
      ],
      evening: [
        "Good evening! Wrapping up some great work today?",
        "Evening! Time to review your progress.",
        "Good evening! Your projects are thriving.",
        "Evening vibes! Great work so far today.",
        "Good evening! Let's see what you've built.",
      ],
      night: [
        "Working late? Your projects appreciate the dedication!",
        "Night owl! Your apps are in good hands.",
        "Late night coding? We love the commitment!",
        "Night shift! Your projects are secure.",
        "Working into the night? Your apps are grateful!",
      ],
    };

    const randomHeader =
      headers[Math.floor(Math.random() * headers.length)] || "";

    const timeGreetings =
      subTextGreetings[timeOfDay as keyof typeof subTextGreetings];
    const randomSubText =
      timeGreetings[Math.floor(Math.random() * timeGreetings.length)];

    return { header: randomHeader, subText: randomSubText };
  };

  useEffect(() => {
    setGreeting(getRandomGreeting());
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Oluwatobiloba {greeting.header}
            </h1>
            <p className="text-lg text-theme-muted font-[family-name:var(--font-epilogue)]">
              {subtitle || greeting.subText}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {showNewProjectButton && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowNewProjectModal(true)}
                className="flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PlusIcon className="w-5 h-5" />
                New Project
              </Button>
            )}

            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="size-10 bg-theme-border object-cover rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-theme-primary to-theme-accent rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="hidden md:block">
                <div className="text-sm font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                  John Doe
                </div>
                <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                  john@example.com
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Icon */}
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative size-9 cursor-pointer bg-theme-secondary p-2 transition-colors duration-300 hover:bg-theme-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle notifications"
            >
              <BellIcon className="w-5 h-5" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
      />
    </>
  );
};

export default ProjectHeader;
