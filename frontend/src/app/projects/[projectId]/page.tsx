"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectView from "@/components/project/view/ProjectView";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading project data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [projectId]);

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

  return <ProjectView projectId={projectId} />;
}
