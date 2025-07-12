"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  FolderIcon,
  CogIcon,
  UserIcon,
  ChartBarIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, onToggleCollapse }: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Generate random avatar URL
  const generateAvatarUrl = () => {
    return `https://api.dicebear.com/9.x/avataaars/png?seed=${faker.string.uuid()}`;
  };

  useEffect(() => {
    setAvatarUrl(generateAvatarUrl());
  }, []);

  const navigationItems = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      href: "/project",
      active: true,
      badge: null,
    },
    {
      name: "Projects",
      icon: FolderIcon,
      href: "/project/projects",
      active: false,
      badge: "12",
    },
    {
      name: "Analytics",
      icon: ChartBarIcon,
      href: "/project/analytics",
      active: false,
      badge: null,
    },
    {
      name: "Deployments",
      icon: RocketLaunchIcon,
      href: "/project/deployments",
      active: false,
      badge: "3",
    },
    {
      name: "Settings",
      icon: CogIcon,
      href: "/project/settings",
      active: false,
      badge: null,
    },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`h-full bg-theme-background/95 backdrop-blur-sm border-r border-theme-border flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 border-b border-theme-border flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="size-8 bg-theme-border object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-theme-primary to-theme-accent flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                  John Doe
                </div>
                <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                  john@example.com
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleCollapse(!isCollapsed)}
          className="p-1 hover:bg-theme-card/50 transition-colors duration-200 flex-shrink-0"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="relative"
              onMouseEnter={() => isCollapsed && setHoveredItem(item.name)}
              onMouseLeave={() => isCollapsed && setHoveredItem(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-3 p-3 transition-all duration-200 group ${
                  item.active
                    ? "bg-theme-primary text-white shadow-lg"
                    : "text-theme-muted hover:text-theme-foreground hover:bg-theme-card/50"
                } ${isCollapsed ? "justify-center px-6" : ""}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-medium font-[family-name:var(--font-epilogue)]">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.active
                            ? "bg-white/20 text-white"
                            : "bg-theme-primary/10 text-theme-primary"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </a>

              {/* Tooltip for collapsed mode */}
              {isCollapsed && hoveredItem === item.name && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50"
                >
                  <div className="bg-theme-background backdrop-blur-sm border border-theme-border px-3 py-2 shadow-lg">
                    <div className="text-sm font-medium text-theme-foreground whitespace-nowrap font-[family-name:var(--font-fraunces)]">
                      {item.name}{" "}
                      {item.badge && (
                        <span className="text-xs text-theme-muted mt-1 font-[family-name:var(--font-epilogue)]">
                          ({item.badge} items)
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
