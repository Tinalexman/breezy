"use client";

import { motion } from "framer-motion";
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
} from "@heroicons/react/24/outline";
import { useState } from "react";

const ProjectOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = [
    {
      id: 1,
      name: "E-Commerce App",
      description:
        "A modern e-commerce Flutter application with payment integration and real-time inventory management",
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
      description:
        "Simple and intuitive task management application with team collaboration",
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
      description:
        "Real-time weather information with beautiful UI and location-based forecasts",
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
      description:
        "Community-driven social networking platform with real-time messaging",
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
      description:
        "Comprehensive fitness tracking app with workout plans and progress analytics",
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
      description:
        "AI-powered recipe discovery app with personalized recommendations",
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
      change: "+2",
      changeType: "positive",
      icon: FolderIcon,
      color: "blue",
    },
    {
      name: "Live Apps",
      value: "8",
      change: "+1",
      changeType: "positive",
      icon: GlobeAltIcon,
      color: "green",
    },
    {
      name: "Total Views",
      value: "2.8K",
      change: "+12%",
      changeType: "positive",
      icon: EyeIcon,
      color: "purple",
    },
    {
      name: "Avg. Load Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "positive",
      icon: ClockIcon,
      color: "orange",
    },
  ];

  const recentActivity = [
    {
      action: "Deployed E-Commerce App",
      time: "2 hours ago",
      type: "deploy",
      user: "John Doe",
      icon: PlayIcon,
    },
    {
      action: "Updated Task Manager",
      time: "1 day ago",
      type: "update",
      user: "Jane Smith",
      icon: CogIcon,
    },
    {
      action: "Created Weather App",
      time: "3 days ago",
      type: "create",
      user: "Mike Johnson",
      icon: PlusIcon,
    },
    {
      action: "Analytics updated",
      time: "1 week ago",
      type: "analytics",
      user: "System",
      icon: ChartBarIcon,
    },
  ];

  const filters = [
    { id: "all", name: "All Projects", count: projects.length },
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

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "all") return true;
    return project.status.toLowerCase() === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Building":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Draft":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Live":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "Building":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case "Draft":
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-theme-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-${stat.color}-500/10 rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.changeType === "positive"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.changeType === "positive" ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)] mb-1">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters and View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-between"
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
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-theme-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{project.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)] mb-1">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {getStatusIcon(project.status)}
                            {project.status}
                          </span>
                          <span className="text-xs text-theme-muted bg-theme-card/50 px-2 py-1">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-theme-muted text-sm mb-4 font-[family-name:var(--font-epilogue)] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                        {project.performance.loadTime}
                      </div>
                      <div className="text-xs text-theme-muted">Load Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                        {project.performance.uptime}
                      </div>
                      <div className="text-xs text-theme-muted">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                        {project.performance.errors}
                      </div>
                      <div className="text-xs text-theme-muted">Error Rate</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-theme-muted flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        Views
                      </span>
                      <span className="font-medium text-theme-foreground">
                        {project.views.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-theme-muted flex items-center gap-1">
                        <ArrowTrendingUpIcon className="w-4 h-4" />
                        Growth
                      </span>
                      <span
                        className={`font-medium flex items-center gap-1 ${
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

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-theme-muted flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        Last Deployed
                      </span>
                      <span className="font-medium text-theme-foreground">
                        {project.lastDeployed}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-theme-muted flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        Team
                      </span>
                      <span className="font-medium text-theme-foreground">
                        {project.team.length} member
                        {project.team.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      <GlobeAltIcon className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                    <Button variant="outline" size="sm">
                      <CogIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="border-theme-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Recent Activity
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 border border-theme-border hover:bg-theme-card/30 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-theme-primary/10 flex items-center justify-center">
                    <activity.icon className="w-5 h-5 text-theme-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-theme-foreground font-[family-name:var(--font-epilogue)]">
                      {activity.action}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-theme-muted">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectOverview;
