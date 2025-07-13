"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  TrashIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import ProjectOverview from "./ProjectOverview";
import ProjectLogs from "./ProjectLogs";
import ProjectAnalytics from "./ProjectAnalytics";
import ProjectSettings from "./ProjectSettings";
import ProjectEnvironment from "./ProjectEnvironment";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

interface ProjectViewProps {
  projectId: string;
}

type TabType = "overview" | "logs" | "analytics" | "settings" | "environment";

const tabs = [
  { id: "overview", name: "Overview", icon: GlobeAltIcon },
  { id: "logs", name: "Logs", icon: DocumentTextIcon },
  { id: "analytics", name: "Analytics", icon: ChartBarIcon },
  { id: "settings", name: "Settings", icon: Cog6ToothIcon },
  { id: "environment", name: "Environment", icon: Cog6ToothIcon },
];

const ProjectView = ({ projectId }: ProjectViewProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const router = useRouter();
  const toast = useToast();

  // WebSocket connection for real-time updates
  const { messages, sendMessage, isConnected } = useWebSocket(
    `ws://localhost:8080/ws/project/${projectId}`
  );

  useEffect(() => {
    // Simulate fetching project data
    const fetchProject = async () => {
      try {
        // Mock project data
        const mockProject = {
          id: projectId,
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
          buildStatus: "idle", // idle, building, success, failed
          logs: [],
        };
        setProject(mockProject);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load project");
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, toast]);

  useEffect(() => {
    // Handle WebSocket messages
    messages.forEach((message) => {
      try {
        const data = JSON.parse(message);

        switch (data.type) {
          case "build_start":
            setIsBuilding(true);
            toast.success("Build started!");
            break;
          case "build_log":
            // Handle build logs
            break;
          case "build_complete":
            setIsBuilding(false);
            toast.success("Build completed successfully!");
            break;
          case "build_failed":
            setIsBuilding(false);
            toast.error("Build failed");
            break;
          case "deploy_complete":
            toast.success("Deployment completed!");
            break;
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    });
  }, [messages, toast]);

  const handleBuild = () => {
    if (!isConnected) {
      toast.error("Not connected to server");
      return;
    }

    setIsBuilding(true);
    sendMessage(
      JSON.stringify({
        type: "build_request",
        projectId: projectId,
      })
    );
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      // Handle project deletion
      toast.success("Project deleted");
      router.push("/projects");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-theme-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-theme-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-theme-foreground mb-4">
            Project not found
          </h2>
          <Button onClick={() => router.push("/projects")}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Live":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case "Building":
        return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
      case "Failed":
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProjectOverview project={project} />;
      case "logs":
        return <ProjectLogs projectId={projectId} />;
      case "analytics":
        return <ProjectAnalytics projectId={projectId} />;
      case "settings":
        return <ProjectSettings project={project} />;
      case "environment":
        return <ProjectEnvironment projectId={projectId} />;
      default:
        return <ProjectOverview project={project} />;
    }
  };

  return (
    <div className="min-h-screen bg-theme-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-theme-border bg-theme-card/30 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/projects")}
                className="p-2"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="text-3xl">{project.icon}</div>
                <div>
                  <h1 className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                    {project.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(project.status)}
                    <span className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                      {project.status}
                    </span>
                    {isBuilding && (
                      <span className="text-sm text-yellow-500 font-[family-name:var(--font-epilogue)]">
                        • Building...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={handleBuild}
                disabled={isBuilding}
                className="font-[family-name:var(--font-epilogue)]"
              >
                {isBuilding ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Building...
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Build & Deploy
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(project.url, "_blank")}
                className="font-[family-name:var(--font-epilogue)]"
              >
                <GlobeAltIcon className="w-4 h-4 mr-2" />
                View Live
              </Button>

              <Button
                variant="ghost"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-theme-border bg-theme-card/20">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-theme-primary border-b-2 border-theme-primary"
                      : "text-theme-muted hover:text-theme-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectView;
