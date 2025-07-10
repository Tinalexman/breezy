"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  PlusIcon,
  GlobeAltIcon,
  ClockIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const ProjectOverview = () => {
  const projects = [
    {
      id: 1,
      name: "E-Commerce App",
      description:
        "A modern e-commerce Flutter application with payment integration",
      status: "Live",
      url: "https://ecommerce-app.breezy.dev",
      lastDeployed: "2 hours ago",
      views: 1247,
      growth: 12.5,
      icon: "🛍️",
    },
    {
      id: 2,
      name: "Task Manager",
      description: "Simple and intuitive task management application",
      status: "Live",
      url: "https://task-manager.breezy.dev",
      lastDeployed: "1 day ago",
      views: 892,
      growth: -3.2,
      icon: "📋",
    },
    {
      id: 3,
      name: "Weather App",
      description: "Real-time weather information with beautiful UI",
      status: "Building",
      url: "https://weather-app.breezy.dev",
      lastDeployed: "3 days ago",
      views: 567,
      growth: 8.7,
      icon: "🌤️",
    },
    {
      id: 4,
      name: "Social Network",
      description: "Community-driven social networking platform",
      status: "Draft",
      url: "https://social-network.breezy.dev",
      lastDeployed: "1 week ago",
      views: 234,
      growth: 15.3,
      icon: "👥",
    },
  ];

  const stats = [
    {
      name: "Total Projects",
      value: "12",
      change: "+2",
      changeType: "positive",
    },
    { name: "Live Apps", value: "8", change: "+1", changeType: "positive" },
    {
      name: "Total Views",
      value: "2.8K",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Avg. Load Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "positive",
    },
  ];

  const recentActivity = [
    { action: "Deployed E-Commerce App", time: "2 hours ago", type: "deploy" },
    { action: "Updated Task Manager", time: "1 day ago", type: "update" },
    { action: "Created Weather App", time: "3 days ago", type: "create" },
    { action: "Analytics updated", time: "1 week ago", type: "analytics" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Dashboard
            </h1>
            <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
              Welcome back! Here's an overview of your projects.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            New Project
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.name} hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                    {stat.value}
                  </p>
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
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
            Recent Projects
          </h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{project.icon}</div>
                      <div>
                        <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                          {project.name}
                        </h3>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === "Live"
                              ? "bg-green-100 text-green-800"
                              : project.status === "Building"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-theme-muted text-sm mb-4 font-[family-name:var(--font-epilogue)]">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-theme-muted">Views</span>
                      <span className="font-medium text-theme-foreground">
                        {project.views}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-theme-muted">Growth</span>
                      <span
                        className={`font-medium ${
                          project.growth > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {project.growth > 0 ? "+" : ""}
                        {project.growth}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-theme-muted">Last Deployed</span>
                      <span className="font-medium text-theme-foreground">
                        {project.lastDeployed}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      <GlobeAltIcon className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Settings
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
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Recent Activity
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded border border-theme-border"
                >
                  <div className="w-8 h-8 bg-theme-primary/10 rounded-full flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-theme-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-theme-foreground font-[family-name:var(--font-epilogue)]">
                      {activity.action}
                    </p>
                    <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                      {activity.time}
                    </p>
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
