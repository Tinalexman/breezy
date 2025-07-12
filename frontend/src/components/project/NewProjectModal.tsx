"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
  XMarkIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  StarIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
  const [formData, setFormData] = useState({
    selectedRepo: null as any,
  });

  // Mock GitHub repositories data
  const repositories = [
    {
      id: 1,
      name: "ecommerce-app",
      fullName: "john-doe/ecommerce-app",
      description:
        "A modern e-commerce Flutter application with payment integration",
      language: "Dart",
      stars: 45,
      forks: 12,
      private: false,
      updatedAt: "2 days ago",
    },
    {
      id: 2,
      name: "task-manager",
      fullName: "john-doe/task-manager",
      description: "Simple and intuitive task management application",
      language: "Dart",
      stars: 23,
      forks: 8,
      private: false,
      updatedAt: "1 week ago",
    },
    {
      id: 3,
      name: "weather-app",
      fullName: "john-doe/weather-app",
      description: "Real-time weather information with beautiful UI",
      language: "Dart",
      stars: 67,
      forks: 15,
      private: false,
      updatedAt: "3 days ago",
    },
    {
      id: 4,
      name: "social-network",
      fullName: "john-doe/social-network",
      description: "Community-driven social networking platform",
      language: "Dart",
      stars: 89,
      forks: 23,
      private: false,
      updatedAt: "5 days ago",
    },
    {
      id: 5,
      name: "fitness-tracker",
      fullName: "john-doe/fitness-tracker",
      description: "Comprehensive fitness tracking app with workout plans",
      language: "Dart",
      stars: 156,
      forks: 34,
      private: false,
      updatedAt: "1 day ago",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating project:", formData);
    // Here you would typically make an API call to create the project
    onClose();
    setFormData({
      selectedRepo: null,
    });
  };

  const handleRepoSelect = (repo: any) => {
    setFormData((prev) => ({ ...prev, selectedRepo: repo }));
  };

  const handleClose = () => {
    onClose();
    setFormData({
      selectedRepo: null,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-theme-border shadow-2xl max-w-full">
              <CardHeader className="border-b border-theme-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      New Project
                    </h2>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Choose a GitHub repository to deploy
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="p-2"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Repository Search */}
                    <div>
                      <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                        Search Repositories
                      </label>
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-muted" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search repositories..."
                          className="w-full pl-10 pr-4 py-3 bg-theme-card/30 border border-theme-border focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                        />
                      </div>
                    </div>

                    {/* Repository List */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {filteredRepos.length > 0 ? (
                        filteredRepos.map((repo) => (
                          <div key={repo.id}>
                            <label className="block cursor-pointer">
                              <input
                                type="radio"
                                name="repository"
                                value={repo.id}
                                checked={formData.selectedRepo?.id === repo.id}
                                onChange={() => handleRepoSelect(repo)}
                                className="sr-only"
                              />
                              <div
                                className={`p-4 border-2 transition-all duration-200 ${
                                  formData.selectedRepo?.id === repo.id
                                    ? "border-theme-primary bg-theme-primary/5"
                                    : "border-theme-border hover:border-theme-border"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <FolderIcon className="w-5 h-5 text-theme-muted mt-1 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                                        {repo.name}
                                      </h3>
                                      {repo.private && (
                                        <span className="px-2 py-1 bg-theme-card/50 text-xs rounded-full text-theme-muted">
                                          Private
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)] mb-2">
                                      {repo.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-theme-muted">
                                      <span className="flex items-center gap-1">
                                        <StarIcon className="w-3 h-3" />
                                        {repo.stars}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <EyeIcon className="w-3 h-3" />
                                        {repo.forks}
                                      </span>
                                      <span>{repo.language}</span>
                                      <span>{repo.updatedAt}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-theme-card/30 border border-theme-border flex items-center justify-center mx-auto mb-4">
                            <MagnifyingGlassIcon className="w-8 h-8 text-theme-muted" />
                          </div>
                          <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)] mb-2">
                            No repositories found
                          </h3>
                          <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                            {searchQuery ? (
                              <>
                                No repositories match "
                                <span className="font-medium">
                                  {searchQuery}
                                </span>
                                "
                              </>
                            ) : (
                              "Try searching for a repository name or description"
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-theme-border">
                    <div className="flex items-center gap-3 ml-auto">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        className="font-[family-name:var(--font-epilogue)]"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!formData.selectedRepo}
                        className="font-[family-name:var(--font-epilogue)]"
                      >
                        <SparklesIcon className="w-4 h-4 mr-2" />
                        Create Project
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewProjectModal;
