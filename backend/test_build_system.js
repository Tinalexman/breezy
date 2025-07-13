// Test script for the build system
// Run this with Node.js to test the complete flow

const WebSocket = require("ws");

// Configuration
const BASE_URL = "http://localhost:6500";
const WS_URL = "ws://localhost:6500";
const TEST_TOKEN = "your-jwt-token-here"; // Replace with actual token

// Test data
const testApp = {
  name: "Test Flutter App",
  description: "A test Flutter web application",
  repoURL: "https://github.com/flutter/samples",
  branch: "main",
};

async function testBuildSystem() {
  console.log("🚀 Testing Breezy Build System\n");

  try {
    // Step 1: Create app with automatic build
    console.log("1. Creating app with automatic build...");
    const createResponse = await fetch(`${BASE_URL}/api/apps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
      body: JSON.stringify(testApp),
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create app: ${createResponse.statusText}`);
    }

    const createData = await createResponse.json();
    console.log("✅ App created successfully");
    console.log("   App ID:", createData.data.app.id);
    console.log("   App Name:", createData.data.app.name);
    console.log("   Build Scheduled:", createData.data.app.buildScheduled);

    const appId = createData.data.app.id;

    // Step 2: Connect to WebSocket for real-time updates
    console.log("\n2. Connecting to WebSocket for build updates...");

    const ws = new WebSocket(`${WS_URL}/ws/builds`, {
      headers: {
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
    });

    ws.on("open", () => {
      console.log("✅ WebSocket connected");
    });

    ws.on("message", (data) => {
      const update = JSON.parse(data.toString());
      if (update.appId === appId) {
        console.log(
          `📦 Build Update: ${update.status} - ${update.message} (${update.progress}%)`
        );

        if (update.status === "success") {
          console.log("🎉 Build completed successfully!");
          ws.close();
        } else if (update.status === "failed") {
          console.log("❌ Build failed!");
          ws.close();
        }
      }
    });

    ws.on("error", (error) => {
      console.error("❌ WebSocket error:", error.message);
    });

    // Step 3: Wait for build to complete (or timeout after 5 minutes)
    console.log("\n3. Waiting for build to complete...");
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("⏰ Build timeout reached");
        ws.close();
        resolve();
      }, 5 * 60 * 1000); // 5 minutes timeout
    });

    // Step 4: Get user's apps
    console.log("\n4. Fetching user apps...");
    const appsResponse = await fetch(`${BASE_URL}/api/apps`, {
      headers: {
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
    });

    if (appsResponse.ok) {
      const appsData = await appsResponse.json();
      console.log("✅ User apps retrieved");
      console.log("   Total apps:", appsData.data.count);

      appsData.data.apps.forEach((app, index) => {
        console.log(`   ${index + 1}. ${app.name} (${app.sanitizedName})`);
        if (app.staticFilesURL) {
          console.log(`      URL: ${app.staticFilesURL}`);
        }
      });
    }

    // Step 5: Get specific app details
    console.log("\n5. Fetching specific app details...");
    const appResponse = await fetch(`${BASE_URL}/api/apps/${appId}`, {
      headers: {
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
    });

    if (appResponse.ok) {
      const appData = await appResponse.json();
      console.log("✅ App details retrieved");
      console.log("   Name:", appData.data.app.name);
      console.log("   Description:", appData.data.app.description);
      console.log(
        "   Status:",
        appData.data.app.isActive ? "Active" : "Inactive"
      );
      if (appData.data.app.staticFilesURL) {
        console.log("   Deployed URL:", appData.data.app.staticFilesURL);
      }
    }

    console.log("\n🎉 Build system test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

// Instructions for running the test
console.log(`
📋 Test Instructions:
1. Make sure the backend server is running on localhost:6500
2. Replace 'your-jwt-token-here' with a valid JWT token
3. Install Node.js dependencies: npm install ws node-fetch
4. Run: node test_build_system.js

Requirements:
- Git installed and in PATH
- Flutter SDK installed and in PATH
- MongoDB running
- Valid JWT token from authentication
`);

// Run the test
testBuildSystem();
