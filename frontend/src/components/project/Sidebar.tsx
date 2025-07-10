"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  FolderIcon,
  CogIcon,
  UserIcon,
  PlusIcon,
  ChartBarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, onToggleCollapse }: SidebarProps) => {
  const navigationItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/project", active: true },
    { name: "Projects", icon: FolderIcon, href: "/project/projects" },
    { name: "Analytics", icon: ChartBarIcon, href: "/project/analytics" },
    { name: "Settings", icon: CogIcon, href: "/project/settings" },
    { name: "Profile", icon: UserIcon, href: "/project/profile" },
  ];

  const quickActions = [
    {
      name: "New Project",
      icon: PlusIcon,
      action: () => console.log("New Project"),
    },
    {
      name: "Deploy App",
      icon: GlobeAltIcon,
      action: () => console.log("Deploy App"),
    },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`h-full bg-theme-background border-r border-theme-border flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 border-b border-theme-border flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
              Breezy
            </h2>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleCollapse(!isCollapsed)}
          className="p-1"
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
        <div className="space-y-2">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded transition-colors duration-200 ${
                  item.active
                    ? "bg-theme-primary text-white"
                    : "text-theme-muted hover:text-theme-foreground hover:bg-theme-background/50"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-[family-name:var(--font-epilogue)]">
                    {item.name}
                  </span>
                )}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-sm font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start gap-3"
                  >
                    <action.icon className="w-4 h-4" />
                    {action.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-theme-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex-1"
            >
              <div className="text-sm font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                John Doe
              </div>
              <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                john@example.com
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
