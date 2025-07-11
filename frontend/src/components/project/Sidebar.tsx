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
  PlusIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BellIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ClockIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  CloudIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, onToggleCollapse }: SidebarProps) => {
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
    {
      name: "Profile",
      icon: UserIcon,
      href: "/project/profile",
      active: false,
      badge: null,
    },
  ];

  const quickActions = [
    {
      name: "New Project",
      icon: PlusIcon,
      action: () => console.log("New Project"),
      description: "Create a new Flutter project",
      color: "blue",
    },
    {
      name: "Deploy App",
      icon: GlobeAltIcon,
      action: () => console.log("Deploy App"),
      description: "Deploy to production",
      color: "green",
    },
    {
      name: "View Logs",
      icon: CommandLineIcon,
      action: () => console.log("View Logs"),
      description: "Check deployment logs",
      color: "purple",
    },
  ];

  const recentProjects = [
    { name: "E-Commerce App", status: "Live", icon: "🛍️" },
    { name: "Task Manager", status: "Live", icon: "📋" },
    { name: "Weather App", status: "Building", icon: "🌤️" },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`h-full bg-theme-background/95 backdrop-blur-sm border-r border-theme-border flex flex-col ${
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
            className="flex items-center gap-3"
          >
            <Image
              src="/breezy.png"
              alt="Breezy"
              width={32}
              height={32}
              className="size-8"
            />
            {/* <h2 className="text-xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
              Breezy
            </h2> */}
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleCollapse(!isCollapsed)}
          className="p-1 hover:bg-theme-card/50 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-b border-theme-border"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-muted" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-theme-card/30 border border-theme-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary transition-all duration-200"
            />
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <a
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                  item.active
                    ? "bg-theme-primary text-white shadow-lg"
                    : "text-theme-muted hover:text-theme-foreground hover:bg-theme-card/50"
                }`}
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
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <h3 className="text-sm font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)] flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-theme-primary" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start gap-3 hover:shadow-md transition-all duration-200 border-theme-border/50"
                  >
                    <action.icon className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-medium text-theme-foreground text-sm">
                        {action.name}
                      </div>
                      <div className="text-xs text-theme-muted">
                        {action.description}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Projects */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8"
          >
            <h3 className="text-sm font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)] flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-theme-primary" />
              Recent Projects
            </h3>
            <div className="space-y-2">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-theme-card/30 transition-colors duration-200 cursor-pointer group"
                >
                  <div className="text-lg">{project.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-theme-foreground truncate">
                      {project.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          project.status === "Live"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-xs text-theme-muted">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-theme-border/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-theme-primary to-theme-accent rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-theme-background flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex-1"
            >
              <div className="text-sm font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                John Doe
              </div>
              <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                john@example.com
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-500 font-medium">
                  Online
                </span>
              </div>
            </motion.div>
          )}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <Button variant="ghost" size="sm" className="p-1">
                <BellIcon className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="p-3 border-t border-theme-border/50 bg-theme-card/30"
        >
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CloudIcon className="w-3 h-3 text-theme-primary" />
              <span className="text-theme-muted">Production</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheckIcon className="w-3 h-3 text-green-500" />
              <span className="text-green-500 font-medium">Secure</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
