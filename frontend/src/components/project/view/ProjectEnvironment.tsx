"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Cog6ToothIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface ProjectEnvironmentProps {
  projectId: string;
}

interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  isSecret: boolean;
  isVisible: boolean;
}

const ProjectEnvironment = ({ projectId }: ProjectEnvironmentProps) => {
  const [variables, setVariables] = useState<EnvironmentVariable[]>([
    {
      id: "1",
      key: "DATABASE_URL",
      value: "postgresql://user:pass@localhost:5432/db",
      isSecret: true,
      isVisible: false,
    },
    {
      id: "2",
      key: "API_KEY",
      value: "sk-1234567890abcdef",
      isSecret: true,
      isVisible: false,
    },
    {
      id: "3",
      key: "NODE_ENV",
      value: "production",
      isSecret: false,
      isVisible: true,
    },
    {
      id: "4",
      key: "DEBUG",
      value: "false",
      isSecret: false,
      isVisible: true,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newVariable, setNewVariable] = useState({
    key: "",
    value: "",
    isSecret: false,
  });

  const handleAddVariable = () => {
    if (newVariable.key && newVariable.value) {
      const variable: EnvironmentVariable = {
        id: Date.now().toString(),
        key: newVariable.key,
        value: newVariable.value,
        isSecret: newVariable.isSecret,
        isVisible: !newVariable.isSecret,
      };

      setVariables([...variables, variable]);
      setNewVariable({ key: "", value: "", isSecret: false });
      setIsAdding(false);
    }
  };

  const handleDeleteVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setVariables(
      variables.map((v) =>
        v.id === id ? { ...v, isVisible: !v.isVisible } : v
      )
    );
  };

  const getMaskedValue = (value: string) => {
    return "•".repeat(Math.min(value.length, 20));
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
            Environment Variables
          </h2>
          <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
            Manage environment variables for your application
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAdding(true)}
          className="font-[family-name:var(--font-epilogue)]"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Variable
        </Button>
      </motion.div>

      {/* Add New Variable */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-theme-border bg-theme-card/30">
              <CardHeader>
                <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                  Add Environment Variable
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                      Variable Name
                    </label>
                    <input
                      type="text"
                      value={newVariable.key}
                      onChange={(e) =>
                        setNewVariable({ ...newVariable, key: e.target.value })
                      }
                      placeholder="DATABASE_URL"
                      className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)] text-sm rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                      Value
                    </label>
                    <input
                      type={newVariable.isSecret ? "password" : "text"}
                      value={newVariable.value}
                      onChange={(e) =>
                        setNewVariable({
                          ...newVariable,
                          value: e.target.value,
                        })
                      }
                      placeholder="your-value-here"
                      className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)] text-sm rounded-md"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newVariable.isSecret}
                      onChange={(e) =>
                        setNewVariable({
                          ...newVariable,
                          isSecret: e.target.checked,
                        })
                      }
                      className="rounded border-theme-border text-theme-primary focus:ring-theme-primary"
                    />
                    <span className="text-sm text-theme-foreground font-[family-name:var(--font-epilogue)]">
                      Mark as secret
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    onClick={handleAddVariable}
                    className="font-[family-name:var(--font-epilogue)]"
                  >
                    Add Variable
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setNewVariable({ key: "", value: "", isSecret: false });
                    }}
                    className="font-[family-name:var(--font-epilogue)]"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Environment Variables List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="border-theme-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Cog6ToothIcon className="w-5 h-5 text-theme-primary" />
              <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Current Variables
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            {variables.length === 0 ? (
              <div className="text-center py-8">
                <InformationCircleIcon className="w-12 h-12 text-theme-muted mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                  No environment variables
                </h4>
                <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Add environment variables to configure your application
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {variables.map((variable, index) => (
                  <motion.div
                    key={variable.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-theme-card/30 rounded-lg hover:bg-theme-card/50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-theme-foreground font-[family-name:var(--font-fraunces)]">
                          {variable.key}
                        </span>
                        {variable.isSecret && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-[family-name:var(--font-epilogue)]">
                            Secret
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                          {variable.isVisible
                            ? variable.value
                            : getMaskedValue(variable.value)}
                        </span>
                        {variable.isSecret && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleVisibility(variable.id)}
                            className="p-1 h-auto"
                          >
                            {variable.isVisible ? (
                              <EyeSlashIcon className="w-3 h-3" />
                            ) : (
                              <EyeIcon className="w-3 h-3" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteVariable(variable.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 font-[family-name:var(--font-fraunces)]">
                  About Environment Variables
                </h4>
                <div className="text-sm text-blue-600 dark:text-blue-300 space-y-2 font-[family-name:var(--font-epilogue)]">
                  <p>
                    • Environment variables are automatically injected into your
                    application at runtime
                  </p>
                  <p>
                    • Secret variables are masked in the UI and logs for
                    security
                  </p>
                  <p>
                    • Changes to environment variables require a redeployment to
                    take effect
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectEnvironment;
