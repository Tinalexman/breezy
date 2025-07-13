"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Cog6ToothIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface ProjectSettingsProps {
  project: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const ProjectSettings = ({ project }: ProjectSettingsProps) => {
  const [settings, setSettings] = useState({
    autoDeploy: true,
    notifications: true,
    analytics: true,
    customDomain: "",
    sslEnabled: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  // eslint-disable-line @typescript-eslint/no-explicit-any
  const handleSettingChange = (key: string, value: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any

    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const settingsSections = [
    {
      title: "Deployment",
      icon: GlobeAltIcon,
      settings: [
        {
          key: "autoDeploy",
          label: "Auto-deploy on push",
          description:
            "Automatically deploy when changes are pushed to the main branch",
          type: "toggle",
        },
        {
          key: "notifications",
          label: "Deployment notifications",
          description: "Receive notifications for build and deployment events",
          type: "toggle",
        },
      ],
    },
    {
      title: "Analytics",
      icon: Cog6ToothIcon,
      settings: [
        {
          key: "analytics",
          label: "Enable analytics",
          description: "Track performance and user engagement metrics",
          type: "toggle",
        },
      ],
    },
    {
      title: "Security",
      icon: ShieldCheckIcon,
      settings: [
        {
          key: "sslEnabled",
          label: "SSL Certificate",
          description: "Enable HTTPS for your application",
          type: "toggle",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
            Project Settings
          </h2>
          <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
            Configure your project&apos;s deployment and behavior settings
          </p>
          <p>{project.id}</p>
        </div>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => {
        const Icon = section.icon;
        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + sectionIndex * 0.1 }}
          >
            <Card className="border-theme-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-theme-primary" />
                  <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                    {section.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.settings.map((setting, index) => (
                  <motion.div
                    key={setting.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + sectionIndex * 0.1 + index * 0.1,
                    }}
                    className="flex items-center justify-between p-4 bg-theme-card/30 rounded-lg hover:bg-theme-card/50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-theme-foreground font-[family-name:var(--font-fraunces)]">
                          {setting.label}
                        </h4>
                        {settings[setting.key as keyof typeof settings] && (
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                        {setting.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {setting.type === "toggle" && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              settings[
                                setting.key as keyof typeof settings
                              ] as boolean
                            }
                            onChange={(e) =>
                              handleSettingChange(setting.key, e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-theme-card/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-theme-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      {/* Custom Domain */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-theme-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <GlobeAltIcon className="w-5 h-5 text-theme-primary" />
              <h3 className="text-lg font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Custom Domain
              </h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                  Domain Name
                </label>
                <input
                  type="text"
                  value={settings.customDomain}
                  onChange={(e) =>
                    handleSettingChange("customDomain", e.target.value)
                  }
                  placeholder="your-domain.com"
                  className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)] text-sm rounded-md"
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                className="font-[family-name:var(--font-epilogue)]"
              >
                Add Domain
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
              <InformationCircleIcon className="w-4 h-4" />
              <span>
                Point your domain&apos;s CNAME record to:{" "}
                <code className="bg-theme-card/50 px-1 rounded">
                  app.breezy.dev
                </code>
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 font-[family-name:var(--font-fraunces)]">
                Danger Zone
              </h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <div>
                <h4 className="font-medium text-red-700 dark:text-red-400 font-[family-name:var(--font-fraunces)]">
                  Delete Project
                </h4>
                <p className="text-sm text-red-600 dark:text-red-300 font-[family-name:var(--font-epilogue)]">
                  This action cannot be undone. This will permanently delete the
                  project and all its data.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-300 hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-900/20 font-[family-name:var(--font-epilogue)]"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-end"
      >
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSaving}
          className="font-[family-name:var(--font-epilogue)]"
        >
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default ProjectSettings;
