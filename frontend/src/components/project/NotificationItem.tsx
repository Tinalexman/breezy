"use client";

import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface NotificationItemProps {
  type: "success" | "info" | "warning" | "analytics";
  title: string;
  message: string;
  time: string;
}

const NotificationItem = ({
  type,
  title,
  message,
  time,
}: NotificationItemProps) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="size-4 text-green-500" />;
      case "info":
        return <PlayIcon className="size-4 text-blue-500" />;
      case "warning":
        return <ExclamationTriangleIcon className="size-4 text-yellow-500" />;
      case "analytics":
        return <ChartBarIcon className="size-4 text-purple-500" />;
      default:
        return <CheckCircleIcon className="size-4 text-green-500" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case "success":
        return "bg-green-500/10";
      case "info":
        return "bg-blue-500/10";
      case "warning":
        return "bg-yellow-500/10";
      case "analytics":
        return "bg-purple-500/10";
      default:
        return "bg-green-500/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-theme-card/30 border border-theme-border hover:bg-theme-card/50 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div
          className={`size-8 ${getIconBg()} rounded-full flex items-center justify-center`}
        >
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
            {title}
          </h3>
          <p className="text-xs text-theme-muted mt-1 font-[family-name:var(--font-epilogue)]">
            {message}
          </p>
          <span className="text-xs text-theme-muted mt-2 block font-[family-name:var(--font-epilogue)]">
            {time}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
