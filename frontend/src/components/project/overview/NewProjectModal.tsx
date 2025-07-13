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
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { authAPI } from "@/lib/auth/api";
import { GitHubRepository } from "@/lib/auth/types";
import { useToast } from "@/hooks/useToast";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RepositoryItemProps {
  repo: GitHubRepository;
  isSelected: boolean;
  onSelect: (repo: GitHubRepository) => void;
}

const RepositoryItem = ({
  repo,
  isSelected,
  onSelect,
}: RepositoryItemProps) => {
  const formatDate = (dateString: string) => {
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

  return (
    <div>
      <label className="block cursor-pointer">
        <input
          type="radio"
          name="repository"
          value={repo.id}
          checked={isSelected}
          onChange={() => onSelect(repo)}
          className="sr-only"
        />
        <div
          className={`p-4 border-2 transition-all duration-200 ${
            isSelected
              ? "border-theme-primary bg-theme-primary/5 shadow-lg"
              : "border-theme-border hover:border-theme-primary/30 hover:bg-theme-card/20"
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Repository Icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-2xl">📁</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                  {repo.name}
                </h3>
                {repo.private && (
                  <span className="px-2 py-1 bg-theme-primary text-white text-xs font-[family-name:var(--font-epilogue)] font-medium shadow-sm">
                    Private
                  </span>
                )}
              </div>

              <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)] mb-3 line-clamp-2">
                {repo.description || "No description available"}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 px-2 py-1">
                  <StarIconSolid className="w-3 h-3 text-yellow-500" />
                  <span className="font-medium text-yellow-700 dark:text-yellow-300">
                    {repo.stars}
                  </span>
                </span>

                <span className="flex items-center gap-1 ">
                  <EyeIcon className="w-3 h-3 text-blue-500" />
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    {repo.forks}
                  </span>
                </span>

                {repo.language && (
                  <span className="px-2 py-1 bg-theme-secondary text-theme-foreground text-xs font-medium shadow-sm">
                    {repo.language}
                  </span>
                )}

                <span className="text-theme-muted text-xs">
                  {formatDate(repo.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
  const [formData, setFormData] = useState({
    selectedRepo: null as GitHubRepository | null,
  });
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);
  const toast = useToast();

  // Fetch GitHub repositories when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchRepositories();
    }
  }, [isOpen]);

  const fetchRepositories = async () => {
    setIsLoading(true);
    try {
      const repos = await authAPI.getGitHubRepositories();
      const newRepos = repos.repos.filter((repo) => repo.language === "Dart");
      setRepositories(newRepos);
      setCount(newRepos.length);
    } catch (error) {
      console.error("Failed to fetch repositories:", error);
      toast.error("Failed to fetch GitHub repositories");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleRepoSelect = (repo: GitHubRepository) => {
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
            <Card className="border-theme-border shadow-2xl w-full h-[600px] flex flex-col">
              <CardHeader className=" flex-shrink-0">
                <div className="flex gap-1 items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      New Project
                    </h2>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Choose a Flutter project to deploy
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

              <CardContent className="flex-1 flex flex-col min-h-0">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  {/* Repository Search */}
                  <div className="flex-shrink-0 mb-4">
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
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {isLoading && (
                      <div className="text-center py-8">
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
                          Loading repositories...
                        </p>
                      </div>
                    )}

                    {!isLoading &&
                      filteredRepos.length > 0 &&
                      filteredRepos.map((repo) => (
                        <RepositoryItem
                          key={repo.id}
                          repo={repo}
                          isSelected={formData.selectedRepo?.id === repo.id}
                          onSelect={handleRepoSelect}
                        />
                      ))}

                    {!isLoading && filteredRepos.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-theme-card/30 border border-theme-border flex items-center justify-center mx-auto mb-4">
                          <FolderIcon className="w-8 h-8 text-theme-muted" />
                        </div>
                        <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)] mb-2">
                          No repositories found
                        </h3>
                        <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                          {searchQuery ? (
                            <>
                              No repositories match "
                              <span className="font-medium">{searchQuery}</span>
                              "
                            </>
                          ) : (
                            "You don't have any repositories yet. Create one on GitHub first."
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 justify-end pt-4 border-t border-theme-border flex-shrink-0">
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
