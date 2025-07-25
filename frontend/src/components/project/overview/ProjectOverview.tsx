"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  GlobeAltIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState, useMemo, useEffect } from "react";
import ProjectHeader from "@/components/project/overview/ProjectHeader";
import NewProjectModal from "./NewProjectModal";
import { appsAPI, App } from "@/lib/apps/api";
import { useToast } from "@/hooks/useToast";

// Use the App type from the API, but extend it for UI display purposes
type Project = App & {
  // UI-specific properties that we'll derive from the App data
  status: string;
  url: string;
  lastDeployed: string;
  views: number;
  growth: number;
  icon: string;
  category: string;
  team: string[];
  performance: {
    loadTime: string;
    uptime: string;
    errors: string;
  };
};

const ProjectOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await appsAPI.getAllApps();

      // Transform App data to Project data with UI-specific properties
      const transformedProjects: Project[] = response.apps.map((app) => ({
        ...app,
        // Derive UI properties from app data
        status: app.isActive ? "Live" : "Draft",
        url: app.staticFilesURL || `https://${app.sanitizedName}.breezy.dev`,
        lastDeployed: formatTimeAgo(app.updatedAt),
        views: Math.floor(Math.random() * 2000) + 100, // Mock data for now
        growth: Math.random() * 40 - 20, // Random growth between -20 and 20
        icon: getAppIcon(app.name),
        category: getAppCategory(app.name),
        team: ["John Doe"], // Mock team data
        performance: {
          loadTime: `${(Math.random() * 2 + 0.5).toFixed(1)}s`,
          uptime: `${(Math.random() * 2 + 98).toFixed(1)}%`,
          errors: `${(Math.random() * 2).toFixed(1)}%`,
        },
      }));

      setProjects(transformedProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Failed to load projects");
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions to derive UI properties from app data
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getAppIcon = (appName: string): string => {
    const icons = ["📱", "🛍️", "📋", "🌤️", "👥", "💪", "🍳", "🎮", "📚", "🏥"];
    const hash = appName.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    return icons[hash % icons.length];
  };

  const getAppCategory = (appName: string): string => {
    const categories = [
      "Mobile",
      "E-commerce",
      "Productivity",
      "Weather",
      "Social",
      "Health",
      "Food",
      "Gaming",
      "Education",
      "Medical",
    ];
    const hash = appName.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    return categories[hash % categories.length];
  };

  const stats = useMemo(() => {
    const liveApps = projects.filter((p) => p.status === "Live").length;
    const totalViews = projects.reduce((sum, p) => sum + p.views, 0);
    const avgLoadTime =
      projects.length > 0
        ? (
            projects.reduce((sum, p) => {
              const loadTime = parseFloat(
                p.performance.loadTime.replace("s", "")
              );
              return sum + loadTime;
            }, 0) / projects.length
          ).toFixed(1) + "s"
        : "0s";

    return [
      {
        name: "Total Projects",
        value: projects.length.toString(),
        emoji: "📁",
        color: "blue",
      },
      {
        name: "Live Apps",
        value: liveApps.toString(),
        emoji: "🌐",
        color: "green",
      },
      {
        name: "Total Views",
        value:
          totalViews > 1000
            ? `${(totalViews / 1000).toFixed(1)}K`
            : totalViews.toString(),
        emoji: "👁️",
        color: "purple",
      },
      {
        name: "Avg. Load Time",
        value: avgLoadTime,
        emoji: "⚡",
        color: "orange",
      },
    ];
  }, [projects]);

  const filters = useMemo(
    () => [
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
    ],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by status
    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (project) => project.status.toLowerCase() === selectedFilter
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedFilter, searchQuery, projects]);

  return (
    <>
      <div className="space-y-6">
        <ProjectHeader
          setShowNewProjectModal={setShowNewProjectModal}
          showNewProjectButton={true}
        />

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
            className="space-y-4"
          >
            {/* Search and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Projects
              </h2>

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
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Search Field */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 bg-theme-card/30 border border-theme-border focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)] text-sm"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={
                      selectedFilter === filter.id ? "primary" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id)}
                    className="text-xs"
                  >
                    {filter.name}
                    <span className="ml-1 px-1.5 py-0.5 bg-theme-background text-theme-foreground rounded-full text-xs">
                      {filter.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-theme-card/30 border border-theme-border flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="animate-spin h-8 w-8 text-theme-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Loading projects...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-theme-card/30 border border-theme-border flex items-center justify-center mx-auto mb-4">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)] mb-2">
                  Failed to load projects
                </h3>
                <p className="text-theme-muted font-[family-name:var(--font-epilogue)] mb-4">
                  {error}
                </p>
                <Button
                  variant="primary"
                  onClick={fetchProjects}
                  className="font-[family-name:var(--font-epilogue)]"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"
                }
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center py-12"
              >
                <Card className="max-w-md mx-auto border-theme-border/50">
                  <CardContent className="p-8">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="w-16 h-16 bg-theme-card/30 border border-theme-border flex items-center justify-center mx-auto mb-6 rounded-lg"
                    >
                      <FolderIcon className="w-8 h-8 text-theme-muted" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-xl font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]"
                    >
                      {searchQuery ? "No projects found" : "No projects yet"}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="text-theme-muted mb-6 font-[family-name:var(--font-epilogue)]"
                    >
                      {searchQuery ? (
                        <>
                          No projects match &quot;
                          <span className="font-medium text-theme-foreground">
                            {searchQuery}
                          </span>
                          &quot;. Try adjusting your search or filters.
                        </>
                      ) : (
                        "Get started by creating your first project. Deploy your Flutter app in minutes!"
                      )}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        className="font-[family-name:var(--font-epilogue)]"
                        onClick={() => {
                          setShowNewProjectModal(true);
                        }}
                      >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {searchQuery
                          ? "Create New Project"
                          : "Create Your First Project"}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      {/* New Project Modal */}
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onProjectCreated={fetchProjects}
      />
    </>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Live":
        return <CheckCircleIcon className="size-3" />;
      case "Building":
        return <ExclamationTriangleIcon className="size-3" />;
      case "Draft":
        return <ClockIcon className="size-3" />;
      default:
        return <ClockIcon className="size-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-600 text-white";
      case "Building":
        return "bg-yellow-600 text-white";
      case "Draft":
        return "bg-gray-600 text-white";
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
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => (window.location.href = `/projects/${project.id}`)}
            >
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project.url, "_blank")}
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectOverview;
