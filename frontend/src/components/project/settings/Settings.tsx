"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  Cog6ToothIcon,
  KeyIcon,
  GlobeAltIcon,
  TrashIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence } from "framer-motion";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const settingsSections = [
    {
      id: "profile",
      name: "Profile",
      icon: UserIcon,
      description: "Manage your account information",
    },
    {
      id: "security",
      name: "Security",
      icon: ShieldCheckIcon,
      description: "Password and authentication settings",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: BellIcon,
      description: "Email and push notification preferences",
    },
    {
      id: "preferences",
      name: "Preferences",
      icon: Cog6ToothIcon,
      description: "Appearance and behavior settings",
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
        <h1 className="text-3xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)] mb-2">
          Settings
        </h1>
        <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="border-theme-border">
            <CardContent className="p-4">
              <div className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                      activeTab === section.id
                        ? "bg-theme-primary text-white shadow-lg"
                        : "text-theme-muted hover:text-theme-foreground hover:bg-theme-card/50"
                    }`}
                  >
                    <section.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium font-[family-name:var(--font-epilogue)]">
                        {section.name}
                      </div>
                      <div className="text-xs opacity-75">
                        {section.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <AnimatePresence mode="wait">
            {activeTab === "profile" && <ProfileSettings key="profile" />}
            {activeTab === "security" && <SecuritySettings key="security" />}
            {activeTab === "notifications" && (
              <NotificationSettings key="notifications" />
            )}
            {activeTab === "preferences" && (
              <PreferenceSettings key="preferences" />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    bio: "",
    website: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-theme-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserIcon className="w-6 h-6 text-theme-primary" />
            <div>
              <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Profile Information
              </h2>
              <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Update your personal information and profile details
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                placeholder="https://your-website.com"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SecuritySettings = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password changed:", passwordData);
    setShowChangePassword(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="border-theme-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="w-6 h-6 text-theme-primary" />
            <div>
              <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Security Settings
              </h2>
              <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Manage your account security and authentication
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="flex items-center justify-between p-4 border border-theme-border rounded-lg">
            <div>
              <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Change Password
              </h3>
              <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                Update your account password
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Change Password
            </Button>
          </div>

          {showChangePassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-theme-border rounded-lg p-4"
            >
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" variant="primary">
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowChangePassword(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 border border-theme-border rounded-lg">
            <div>
              <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>

          {/* Connected Accounts */}
          <div className="flex items-center justify-between p-4 border border-theme-border rounded-lg">
            <div className="flex items-center gap-3">
              <GlobeAltIcon className="w-5 h-5 text-theme-primary" />
              <div>
                <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                  GitHub Account
                </h3>
                <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Connected to GitHub OAuth
                </p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded-full">
              Connected
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    deploymentAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-theme-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BellIcon className="w-6 h-6 text-theme-primary" />
            <div>
              <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                Notification Preferences
              </h2>
              <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Choose how you want to be notified about your projects
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 border border-theme-border rounded-lg"
            >
              <div>
                <h3 className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </h3>
                <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Receive notifications for{" "}
                  {key.toLowerCase().replace(/([A-Z])/g, " $1")}
                </p>
              </div>
              <button
                onClick={() => handleToggle(key as keyof typeof notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? "bg-theme-primary" : "bg-theme-border"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PreferenceSettings = () => {
  const [preferences, setPreferences] = useState({
    theme: "auto",
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-theme-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Cog6ToothIcon className="w-6 h-6 text-theme-primary" />
            <div>
              <h2 className="text-xl font-bold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                App Preferences
              </h2>
              <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                Customize your app experience and appearance
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                Theme
              </label>
              <select
                value={preferences.theme}
                onChange={(e) =>
                  setPreferences({ ...preferences, theme: e.target.value })
                }
                className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
              >
                <option value="auto">Auto (System)</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) =>
                  setPreferences({ ...preferences, language: e.target.value })
                }
                className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) =>
                  setPreferences({ ...preferences, timezone: e.target.value })
                }
                className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-foreground mb-2 font-[family-name:var(--font-epilogue)]">
                Date Format
              </label>
              <select
                value={preferences.dateFormat}
                onChange={(e) =>
                  setPreferences({ ...preferences, dateFormat: e.target.value })
                }
                className="w-full px-3 py-2 bg-theme-card/30 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-200 font-[family-name:var(--font-epilogue)]"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary">Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Settings;
