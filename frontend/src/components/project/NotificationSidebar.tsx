"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NotificationItem from "@/components/project/NotificationItem";

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSidebar = ({ isOpen, onClose }: NotificationSidebarProps) => {
  // Dummy notification data
  const notifications = [
    {
      id: 1,
      type: "success" as const,
      title: "Deployment Successful",
      message: "E-Commerce App has been deployed successfully to production.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "info" as const,
      title: "Build Started",
      message: "Weather App build process has started.",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "warning" as const,
      title: "Performance Alert",
      message: "Task Manager load time has increased by 15%.",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "analytics" as const,
      title: "Analytics Updated",
      message: "New analytics data available for all projects.",
      time: "2 days ago",
    },
    {
      id: 5,
      type: "success" as const,
      title: "Database Backup Complete",
      message: "All project databases have been backed up successfully.",
      time: "3 days ago",
    },
    {
      id: 6,
      type: "info" as const,
      title: "New Team Member",
      message: "Sarah Wilson has joined the development team.",
      time: "1 week ago",
    },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 h-full w-80 bg-theme-background border-l border-theme-border z-50 shadow-2xl"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
            Notifications
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NotificationItem
                type={notification.type}
                title={notification.title}
                message={notification.message}
                time={notification.time}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationSidebar;
