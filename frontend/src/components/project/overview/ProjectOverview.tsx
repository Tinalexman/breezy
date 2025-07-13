"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  GlobeAltIcon,
  ClockIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  ChartBarIcon,
  CogIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  FolderIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useState, useMemo } from "react";

const ProjectOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = [
    {
      id: 1,
      name: "E-Commerce App",
      description: "Modern e-commerce Flutter app with payment integration",
      status: "Live",
      url: "https://ecommerce-app.breezy.dev",
      lastDeployed: "2 hours ago",
      views: 1247,
      growth: 12.5,
      icon: "🛍️",
      category: "E-commerce",
      team: ["John Doe", "Jane Smith"],
      performance: {
        loadTime: "1.2s",
        uptime: "99.9%",
        errors: "0.1%",
      },
    },
    {
      id: 2,
      name: "Task Manager",
      description: "Simple task management with team collaboration",
      status: "Live",
      url: "https://task-manager.breezy.dev",
      lastDeployed: "1 day ago",
      views: 892,
      growth: -3.2,
      icon: "📋",
      category: "Productivity",
      team: ["John Doe"],
      performance: {
        loadTime: "0.8s",
        uptime: "99.8%",
        errors: "0.2%",
      },
    },
    {
      id: 3,
      name: "Weather App",
      description: "Real-time weather with beautiful UI",
      status: "Building",
      url: "https://weather-app.breezy.dev",
      lastDeployed: "3 days ago",
      views: 567,
      growth: 8.7,
      icon: "🌤️",
      category: "Weather",
      team: ["Jane Smith", "Mike Johnson"],
      performance: {
        loadTime: "1.5s",
        uptime: "99.5%",
        errors: "0.5%",
      },
    },
    {
      id: 4,
      name: "Social Network",
      description: "Community-driven social platform",
      status: "Draft",
      url: "https://social-network.breezy.dev",
      lastDeployed: "1 week ago",
      views: 234,
      growth: 15.3,
      icon: "👥",
      category: "Social",
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      performance: {
        loadTime: "2.1s",
        uptime: "98.9%",
        errors: "1.1%",
      },
    },
    {
      id: 5,
      name: "Fitness Tracker",
      description: "Comprehensive fitness tracking app",
      status: "Live",
      url: "https://fitness-tracker.breezy.dev",
      lastDeployed: "5 hours ago",
      views: 2156,
      growth: 23.4,
      icon: "💪",
      category: "Health",
      team: ["Jane Smith"],
      performance: {
        loadTime: "0.9s",
        uptime: "99.9%",
        errors: "0.1%",
      },
    },
    {
      id: 6,
      name: "Recipe Finder",
      description: "AI-powered recipe discovery app",
      status: "Live",
      url: "https://recipe-finder.breezy.dev",
      lastDeployed: "12 hours ago",
      views: 1893,
      growth: 18.7,
      icon: "🍳",
      category: "Food",
      team: ["Mike Johnson", "Sarah Wilson"],
      performance: {
        loadTime: "1.3s",
        uptime: "99.7%",
        errors: "0.3%",
      },
    },
  ];

  const stats = [
    {
      name: "Total Projects",
      value: "12",
      emoji: "📁",
      color: "blue",
    },
    {
      name: "Live Apps",
      value: "8",
      emoji: "🌐",
      color: "green",
    },
    {
      name: "Total Views",
      value: "2.8K",
      emoji: "👁️",
      color: "purple",
    },
    {
      name: "Avg. Load Time",
      value: "1.2s",
      emoji: "⚡",
      color: "orange",
    },
  ];

  const filters = [
    { id: "all", name: "All", count: projects.length },
    {
      id: "live",
      name: "Live",
      count: projects.filter((p) => p.status === "Live").length,
    },
    {
      id: "building",
      name: "Building",
      count: projects.filter((p) => p.status === "Building").length,
    },
    {
      id: "draft",
      name: "Draft",
      count: projects.filter((p) => p.status === "Draft").length,
    },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "all") return projects;
    return projects.filter(
      (project) => project.status.toLowerCase() === selectedFilter
    );
  }, [selectedFilter, projects]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-theme-border/50 overflow-hidden group h-24">
              <div
                className={`h-1 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600`}
              ></div>
              <CardContent className="p-3 h-full flex items-center">
                <div className="flex items-center gap-3 w-full">
                  <div className="text-2xl">{stat.emoji}</div>
                  <div className="flex-1">
                    <p className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)] mb-1">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Projects Section */}
      <div className="space-y-4">
        {/* Header with Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Projects
            </h2>
            <div className="flex items-center gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="text-xs"
                >
                  {filter.name}
                  <span className="ml-1 px-1.5 py-0.5 bg-theme-background rounded-full text-xs">
                    {filter.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Live":
        return <CheckCircleIcon className="w-3 h-3" />;
      case "Building":
        return <ExclamationTriangleIcon className="w-3 h-3" />;
      case "Draft":
        return <ClockIcon className="w-3 h-3" />;
      default:
        return <ClockIcon className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-600 text-white";
      case "Building":
        return "bg-yellow-600 text-white";
      case "Draft":
        return "bg-gray-600 text-theme-foreground";
      default:
        return "";
    }
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      layout
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-theme-border group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{project.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)] mb-1 truncate">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 font-[family-name:var(--font-epilogue)]">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusIcon(project.status)}
                    {project.status}
                  </span>
                  <span className="text-xs text-theme-muted bg-theme-card/50 px-2 py-1 rounded-md">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <EllipsisVerticalIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-theme-muted text-sm mb-4 font-[family-name:var(--font-epilogue)] line-clamp-2">
            {project.description}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 bg-theme-card/30 rounded-lg">
              <div className="text-sm font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                {project.performance.loadTime}
              </div>
              <div className="text-xs text-theme-muted">Load Time</div>
            </div>
            <div className="text-center p-2 bg-theme-card/30 rounded-lg">
              <div className="text-sm font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                {project.views.toLocaleString()}
              </div>
              <div className="text-xs text-theme-muted">Views</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between text-xs text-theme-muted mb-4">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              {project.lastDeployed}
            </span>
            <span
              className={`flex items-center gap-1 ${
                project.growth > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {project.growth > 0 ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : (
                <ArrowDownIcon className="w-3 h-3" />
              )}
              {Math.abs(project.growth)}%
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="primary" size="sm" className="flex-1">
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectOverview;
