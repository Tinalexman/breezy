import { create } from "zustand";

export type BuildStatus =
  | "pending"
  | "building"
  | "success"
  | "failed"
  | "cancelled";

export interface Build {
  id: string;
  appId: string;
  status: BuildStatus;
  progress: number; // 0-100
  startedAt: Date;
  completedAt?: Date;
  logs: string[];
  error?: string;
}

interface BuildQueueState {
  builds: Build[];
  activeBuilds: Build[];
  addBuild: (build: Omit<Build, "id" | "startedAt">) => void;
  updateBuild: (id: string, updates: Partial<Build>) => void;
  removeBuild: (id: string) => void;
  clearCompleted: () => void;
  getBuildById: (id: string) => Build | undefined;
  getBuildsByAppId: (appId: string) => Build[];
}

export const useBuildQueueStore = create<BuildQueueState>((set, get) => ({
  builds: [],
  activeBuilds: [],

  addBuild: (build) => {
    const newBuild: Build = {
      ...build,
      id: Math.random().toString(36).substr(2, 9),
      startedAt: new Date(),
    };

    set((state) => ({
      builds: [newBuild, ...state.builds],
      activeBuilds:
        newBuild.status === "pending" || newBuild.status === "building"
          ? [newBuild, ...state.activeBuilds]
          : state.activeBuilds,
    }));
  },

  updateBuild: (id, updates) => {
    set((state) => {
      const updatedBuilds = state.builds.map((build) =>
        build.id === id ? { ...build, ...updates } : build
      );

      const updatedActiveBuilds = updatedBuilds.filter(
        (build) => build.status === "pending" || build.status === "building"
      );

      return {
        builds: updatedBuilds,
        activeBuilds: updatedActiveBuilds,
      };
    });
  },

  removeBuild: (id) => {
    set((state) => ({
      builds: state.builds.filter((build) => build.id !== id),
      activeBuilds: state.activeBuilds.filter((build) => build.id !== id),
    }));
  },

  clearCompleted: () => {
    set((state) => ({
      builds: state.builds.filter(
        (build) => build.status === "pending" || build.status === "building"
      ),
    }));
  },

  getBuildById: (id) => {
    return get().builds.find((build) => build.id === id);
  },

  getBuildsByAppId: (appId) => {
    return get().builds.filter((build) => build.appId === appId);
  },
}));
