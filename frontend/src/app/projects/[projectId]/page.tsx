"use client";

import { useParams } from "next/navigation";
import ProjectView from "@/components/project/view/ProjectView";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  return <ProjectView projectId={projectId} />;
}
