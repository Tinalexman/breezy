"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  GlobeAltIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  UsersIcon,
  CodeBracketIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

interface ProjectOverviewProps {
  project: any;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const metrics = [
    {
      name: "Total Views",
      value: "0", // project.views.toLocaleString(),
      icon: GlobeAltIcon,
      color: "text-blue-500",
      change: project.growth,
    },
    {
      name: "Load Time",
      value: "0", // project.performance.loadTime,
      icon: ClockIcon,
      color: "text-green-500",
      change: -5.2,
    },
    {
      name: "Uptime",
      value: "0", // project.performance.uptime,
      icon: ServerIcon,
      color: "text-purple-500",
      change: 0.1,
    },
    {
      name: "Error Rate",
      value: "0", // project.performance.errors,
      icon: ExclamationTriangleIcon,
      color: "text-red-500",
      change: -0.2,
    },
  ];

  const recentActivity = [
    {
      type: "deploy",
      message: "Deployment completed successfully",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      type: "build",
      message: "Build process started",
      timestamp: "2 hours ago",
      status: "info",
    },
    {
      type: "update",
      message: "Environment variables updated",
      timestamp: "1 day ago",
      status: "info",
    },
    {
      type: "deploy",
      message: "Previous deployment failed",
      timestamp: "3 days ago",
      status: "error",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deploy":
        return <GlobeAltIcon className="w-4 h-4" />;
      case "build":
        return <CodeBracketIcon className="w-4 h-4" />;
      case "update":
        return <CheckCircleIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-theme-border">
          {/* <CardHeader>
            <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Project Information
            </h2>
          </CardHeader> */}
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                  Description
                </h3>
                <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                  Last Deployed
                </h3>
                <span className="inline-flex items-center px-2 py-1 bg-theme-card/50 text-theme-foreground rounded-md text-sm font-[family-name:var(--font-epilogue)]">
                  {project.lastDeployed}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                  Live URL
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(project.url, "_blank")}
                  className="p-0 h-auto text-theme-primary hover:text-theme-primary/80 font-[family-name:var(--font-epilogue)]"
                >
                  {project.url}
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-theme-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                    <span
                      className={`flex items-center gap-1 text-xs ${
                        metric.change > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {metric.change > 0 ? (
                        <ArrowUpIcon className="w-3 h-3" />
                      ) : (
                        <ArrowDownIcon className="w-3 h-3" />
                      )}
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                    {metric.value}
                  </div>
                  <div className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                    {metric.name}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border-theme-border">
          <CardHeader>
            <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Recent Activity
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-theme-card/30 rounded-lg hover:bg-theme-card/50 transition-colors duration-200"
                >
                  <div className={`${getActivityColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-theme-foreground font-[family-name:var(--font-epilogue)]">
                      {activity.message}
                    </p>
                    <p className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                      {activity.timestamp}
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
