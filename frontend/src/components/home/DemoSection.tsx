"use client";

import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { useAuthStore, useNotificationStore } from "@/stores";

const DemoSection = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const handleDemoLogin = () => {
    login(
      {
        id: "demo-user-1",
        name: "Demo User",
        email: "demo@breezy.com",
        githubUsername: "demo-user",
      },
      "demo-token-123"
    );

    addNotification({
      type: "success",
      title: "Welcome!",
      message: "You have been logged in successfully.",
    });
  };

  const handleDemoLogout = () => {
    logout();
    addNotification({
      type: "info",
      title: "Logged Out",
      message: "You have been logged out successfully.",
    });
  };

  const handleTestNotification = (
    type: "success" | "error" | "warning" | "info"
  ) => {
    const notifications = {
      success: {
        title: "Success!",
        message: "This is a success notification.",
      },
      error: { title: "Error!", message: "This is an error notification." },
      warning: {
        title: "Warning!",
        message: "This is a warning notification.",
      },
      info: { title: "Info!", message: "This is an info notification." },
    };

    addNotification({
      type,
      ...notifications[type],
    });
  };

  return (
    <section className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-light mb-4">
            State Management Demo
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Test the Zustand stores and see how state management works
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Authentication Demo */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Authentication State</CardTitle>
              <CardDescription>
                Test user authentication with Zustand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-dark-primary/20 rounded-lg">
                <p className="text-text-light font-medium mb-2">
                  Current State:
                </p>
                <p className="text-text-muted text-sm">
                  Authenticated: {isAuthenticated ? "Yes" : "No"}
                </p>
                {user && (
                  <p className="text-text-muted text-sm">
                    User: {user.name} ({user.email})
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                {isAuthenticated ? (
                  <Button onClick={handleDemoLogout} variant="outline">
                    Logout Demo User
                  </Button>
                ) : (
                  <Button onClick={handleDemoLogin}>Login Demo User</Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications Demo */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Notification System</CardTitle>
              <CardDescription>
                Test the notification system with different types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  onClick={() => handleTestNotification("success")}
                  className="bg-success-green text-white hover:bg-success-green/90"
                >
                  Success
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleTestNotification("error")}
                  className="bg-error-red text-white hover:bg-error-red/90"
                >
                  Error
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleTestNotification("warning")}
                  className="bg-warning-yellow text-dark-primary hover:bg-warning-yellow/90"
                >
                  Warning
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleTestNotification("info")}
                  className="bg-accent-teal text-dark-primary hover:bg-accent-teal/90"
                >
                  Info
                </Button>
              </div>

              <p className="text-text-muted text-sm">
                Click any button to test the notification system. Notifications
                will appear in the top-right corner.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
