"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Sidebar from "@/components/project/Sidebar";
import ProjectHeader from "@/components/project/ProjectHeader";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-background via-theme-background to-theme-card/20">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-screen z-20">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={setIsSidebarCollapsed}
          />
        </div>

        {/* Main Content with left margin to account for sidebar */}
        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300 ${
            isSidebarCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <div className="p-8 max-w-7xl mx-auto">
            <ProjectHeader />
            {children}
          </div>
        </motion.main>

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-theme-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-theme-accent/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
