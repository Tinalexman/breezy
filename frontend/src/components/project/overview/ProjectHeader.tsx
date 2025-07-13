"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PlusIcon, BellIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationSidebar from "@/components/project/NotificationSidebar";
import { useState, useEffect } from "react";

interface ProjectHeaderProps {
  subtitle?: string;
  showNewProjectButton?: boolean;
  setShowNewProjectModal: (show: boolean) => void;
}

const ProjectHeader = ({
  subtitle,
  showNewProjectButton = true,
  setShowNewProjectModal,
}: ProjectHeaderProps) => {
  const [greeting, setGreeting] = useState({ header: "", subText: "" });
  const [showNotifications, setShowNotifications] = useState(false);

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

    const headerGreetings = {
      morning: [
        { text: "Good morning", emoji: "🌅" },
        { text: "Rise and shine", emoji: "☀️" },
        { text: "Morning", emoji: "🌞" },
        { text: "Good morning", emoji: "🌄" },
        { text: "Welcome to a new day", emoji: "🌅" },
      ],
      afternoon: [
        { text: "Good afternoon", emoji: "🌤️" },
        { text: "Afternoon", emoji: "☀️" },
        { text: "Good afternoon", emoji: "🌞" },
        { text: "Afternoon vibes", emoji: "🌤️" },
        { text: "Good afternoon", emoji: "☀️" },
      ],
      evening: [
        { text: "Good evening", emoji: "🌆" },
        { text: "Evening", emoji: "🌅" },
        { text: "Good evening", emoji: "🌇" },
        { text: "Evening vibes", emoji: "🌆" },
        { text: "Good evening", emoji: "🌅" },
      ],
      night: [
        { text: "Working late", emoji: "🌙" },
        { text: "Night owl", emoji: "🦉" },
        { text: "Late night coding", emoji: "🌙" },
        { text: "Night shift", emoji: "🌃" },
        { text: "Working into the night", emoji: "🌙" },
      ],
    };

    const subTextGreetings = {
      morning: [
        "Ready to build something amazing today?",
        "Your projects are waiting for you.",
        "Let's make today productive.",
        "Time to create something wonderful.",
        "Welcome to a new day of development!",
      ],
      afternoon: [
        "How are your projects coming along?",
        "Perfect time to check on your apps.",
        "Let's see what we can accomplish.",
        "Your projects are looking great.",
        "Ready for some coding magic?",
      ],
      evening: [
        "Wrapping up some great work today?",
        "Time to review your progress.",
        "Your projects are thriving.",
        "Great work so far today.",
        "Let's see what you've built.",
      ],
      night: [
        "Your projects appreciate the dedication!",
        "Your apps are in good hands.",
        "We love the commitment!",
        "Your projects are secure.",
        "Your apps are grateful!",
      ],
    };

    const timeHeaders =
      headerGreetings[timeOfDay as keyof typeof headerGreetings];
    const randomHeader =
      timeHeaders[Math.floor(Math.random() * timeHeaders.length)];

    const timeGreetings =
      subTextGreetings[timeOfDay as keyof typeof subTextGreetings];
    const randomSubText =
      timeGreetings[Math.floor(Math.random() * timeGreetings.length)];

    return {
      header: `${randomHeader.text} ${randomHeader.emoji}`,
      subText: randomSubText,
    };
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
              {greeting.header}
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
    </>
  );
};

export default ProjectHeader;
