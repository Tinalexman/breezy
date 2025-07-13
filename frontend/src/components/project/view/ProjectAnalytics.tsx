"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  GlobeAltIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface ProjectAnalyticsProps {
  projectId: string;
}

const ProjectAnalytics = ({ projectId }: ProjectAnalyticsProps) => {
  const timeRanges = ["24h", "7d", "30d", "90d"];
  const [selectedRange, setSelectedRange] = useState("7d");

  const metrics = [
    {
      name: "Total Views",
      value: "12,847",
      change: 12.5,
      icon: GlobeAltIcon,
      color: "text-blue-500",
    },
    {
      name: "Unique Visitors",
      value: "3,421",
      change: 8.2,
      icon: UsersIcon,
      color: "text-green-500",
    },
    {
      name: "Avg. Load Time",
      value: "1.2s",
      change: -5.3,
      icon: ClockIcon,
      color: "text-purple-500",
    },
    {
      name: "Error Rate",
      value: "0.1%",
      change: -0.2,
      icon: ExclamationTriangleIcon,
      color: "text-red-500",
    },
  ];

  const trafficData = [
    { time: "00:00", views: 45 },
    { time: "04:00", views: 32 },
    { time: "08:00", views: 78 },
    { time: "12:00", views: 156 },
    { time: "16:00", views: 234 },
    { time: "20:00", views: 189 },
    { time: "24:00", views: 67 },
  ];

  const topPages = [
    { page: "/", views: 5421, percentage: 42.1 },
    { page: "/products", views: 3245, percentage: 25.2 },
    { page: "/about", views: 1892, percentage: 14.7 },
    { page: "/contact", views: 1289, percentage: 10.0 },
  ];

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-500" : "text-red-500";
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? (
      <ArrowUpIcon className="w-3 h-3" />
    ) : (
      <ArrowDownIcon className="w-3 h-3" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
            Analytics & Performance
          </h2>
          <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
            Monitor your app&apos;s performance and user engagement
          </p>
          <p>{projectId}</p>
        </div>

        <div className="flex items-center gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range)}
              className="text-xs font-[family-name:var(--font-epilogue)]"
            >
              {range}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
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
                      className={`flex items-center gap-1 text-xs ${getChangeColor(
                        metric.change
                      )}`}
                    >
                      {getChangeIcon(metric.change)}
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

      {/* Traffic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border-theme-border">
          <CardHeader>
            <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Traffic Overview
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {trafficData.map((data, index) => {
                const maxViews = Math.max(...trafficData.map((d) => d.views));
                const height = (data.views / maxViews) * 100;

                return (
                  <motion.div
                    key={data.time}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-theme-primary to-theme-primary/50 rounded-t"
                    style={{ minHeight: "4px" }}
                  >
                    <div className="text-center mt-2">
                      <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                        {data.views}
                      </div>
                      <div className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                        {data.time}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-theme-border">
          <CardHeader>
            <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
              Top Pages
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <motion.div
                  key={page.page}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-theme-card/30 rounded-lg hover:bg-theme-card/50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-theme-foreground font-[family-name:var(--font-epilogue)]">
                        {page.page}
                      </span>
                      <span className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                        {page.views.toLocaleString()} views
                      </span>
                    </div>
                    <div className="w-full bg-theme-card/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${page.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                        className="bg-theme-primary h-2 rounded-full"
                      />
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

export default ProjectAnalytics;
