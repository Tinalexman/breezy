"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useWebSocket } from "@/hooks/useWebSocket";

interface ProjectLogsProps {
  projectId: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
  source: "build" | "deploy" | "system";
}

const ProjectLogs = ({ projectId }: ProjectLogsProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [filter, setFilter] = useState<"all" | "build" | "deploy" | "system">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);

  // WebSocket connection for real-time logs
  const { messages, isConnected: wsConnected } = useWebSocket(
    `ws://localhost:8080/ws/project/${projectId}/logs`
  );

  useEffect(() => {
    setIsConnected(wsConnected);
  }, [wsConnected]);

  useEffect(() => {
    // Handle incoming WebSocket messages
    messages.forEach((message) => {
      try {
        const data = JSON.parse(message as any); // eslint-disable-line @typescript-eslint/no-explicit-any

        if (data.type === "log_entry") {
          const newLog: LogEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            level: data.level || "info",
            message: data.message,
            source: data.source || "system",
          };

          setLogs((prev) => [...prev, newLog]);
        }
      } catch (error) {
        console.error("Failed to parse log message:", error);
      }
    });
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to bottom when new logs arrive
    if (isAutoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isAutoScroll]);

  // Mock initial logs
  useEffect(() => {
    const mockLogs: LogEntry[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 60000).toISOString(),
        level: "info",
        message: "Build process started",
        source: "build",
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 55000).toISOString(),
        level: "info",
        message: "Fetching dependencies...",
        source: "build",
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 50000).toISOString(),
        level: "success",
        message: "Dependencies resolved successfully",
        source: "build",
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 45000).toISOString(),
        level: "info",
        message: "Compiling Flutter application...",
        source: "build",
      },
      {
        id: "5",
        timestamp: new Date(Date.now() - 40000).toISOString(),
        level: "warning",
        message: "Deprecated API usage detected",
        source: "build",
      },
      {
        id: "6",
        timestamp: new Date(Date.now() - 35000).toISOString(),
        level: "success",
        message: "Build completed successfully",
        source: "build",
      },
      {
        id: "7",
        timestamp: new Date(Date.now() - 30000).toISOString(),
        level: "info",
        message: "Starting deployment...",
        source: "deploy",
      },
      {
        id: "8",
        timestamp: new Date(Date.now() - 25000).toISOString(),
        level: "success",
        message: "Deployment completed successfully",
        source: "deploy",
      },
    ];

    setLogs(mockLogs);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesFilter = filter === "all" || log.source === filter;
    const matchesSearch =
      searchQuery === "" ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
      case "success":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case "info":
      default:
        return <InformationCircleIcon className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      case "info":
      default:
        return "text-blue-500";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const downloadLogs = () => {
    const logText = logs
      .map(
        (log) =>
          `[${formatTimestamp(log.timestamp)}] [${log.level.toUpperCase()}] ${
            log.message
          }`
      )
      .join("\n");

    const blob = new Blob([logText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project-${projectId}-logs.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
            Build & Deployment Logs {projectId}
          </h2>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className="font-[family-name:var(--font-epilogue)]"
          >
            {isAutoScroll ? (
              <>
                <PauseIcon className="w-4 h-4 mr-2" />
                Auto-scroll
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4 mr-2" />
                Manual
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={downloadLogs}
            className="font-[family-name:var(--font-epilogue)]"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Download
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={clearLogs}
            className="font-[family-name:var(--font-epilogue)] text-red-500 hover:text-red-600"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
            Filter:
          </span>
          {(["all", "build", "deploy", "system"] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="text-xs font-[family-name:var(--font-epilogue)]"
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>

        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)] text-sm rounded-md"
          />
        </div>
      </motion.div>

      {/* Logs Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-theme-border">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto bg-theme-background font-mono text-sm">
              <div className="p-4 space-y-1">
                <AnimatePresence>
                  {filteredLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-start gap-3 p-2 rounded hover:bg-theme-card/30 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getLevelIcon(log.level)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                            {formatTimestamp(log.timestamp)}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full bg-theme-card/50 ${getLevelColor(
                              log.level
                            )} font-[family-name:var(--font-epilogue)]`}
                          >
                            {log.level.toUpperCase()}
                          </span>
                          <span className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                            [{log.source}]
                          </span>
                        </div>
                        <p className="text-theme-foreground font-[family-name:var(--font-epilogue)] break-words">
                          {log.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={logsEndRef} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectLogs;
