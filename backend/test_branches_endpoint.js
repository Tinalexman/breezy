const axios = require("axios");

const BASE_URL = "http://localhost:8080";
const TEST_USER_ID = "507f1f77bcf86cd799439011"; // Replace with actual user ID

async function testBranchesEndpoint() {
  try {
    console.log("🚀 Testing Repository Branches Endpoint");
    console.log("=====================================\n");

    // Test 1: Valid repository URL
    console.log("1. Testing with valid GitHub repository URL...");
    const validRepoURL = "https://github.com/facebook/react";

    const response1 = await axios.get(`${BASE_URL}/api/repository/branches`, {
      params: {
        repo_url: validRepoURL,
      },
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Replace with actual token
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Success! Repository branches retrieved:");
    console.log(`   Repository: ${validRepoURL}`);
    console.log(`   Total branches: ${response1.data.data.count}`);
    console.log("   Sample branches:");
    response1.data.data.branches.slice(0, 5).forEach((branch) => {
      console.log(`     - ${branch.name} (${branch.sha.substring(0, 8)})`);
    });
    console.log("");

    // Test 2: Invalid repository URL
    console.log("2. Testing with invalid repository URL...");
    try {
      await axios.get(`${BASE_URL}/api/repository/branches`, {
        params: {
          repo_url: "https://invalid-url.com/owner/repo",
        },
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("✅ Expected error received for invalid URL");
        console.log(`   Error: ${error.response.data.message}`);
      } else {
        console.log("❌ Unexpected error:", error.message);
      }
    }
    console.log("");

    // Test 3: Missing repository URL
    console.log("3. Testing with missing repository URL...");
    try {
      await axios.get(`${BASE_URL}/api/repository/branches`, {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("✅ Expected error received for missing URL");
        console.log(`   Error: ${error.response.data.message}`);
      } else {
        console.log("❌ Unexpected error:", error.message);
      }
    }
    console.log("");

    // Test 4: Private repository (should fail with access denied)
    console.log("4. Testing with private repository (expected to fail)...");
    try {
      await axios.get(`${BASE_URL}/api/repository/branches`, {
        params: {
          repo_url: "https://github.com/private-owner/private-repo",
        },
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("✅ Expected error received for private repository");
        console.log(`   Error: ${error.response.data.message}`);
      } else {
        console.log("❌ Unexpected error:", error.message);
      }
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

// Example usage with curl commands
console.log("📋 Example curl commands:");
console.log("========================");
console.log("");
console.log("1. Get branches for a public repository:");
console.log(
  `curl -X GET "${BASE_URL}/api/repository/branches?repo_url=https://github.com/facebook/react" \\`
);
console.log('  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \\');
console.log('  -H "Content-Type: application/json"');
console.log("");
console.log("2. Get branches for a private repository:");
console.log(
  `curl -X GET "${BASE_URL}/api/repository/branches?repo_url=https://github.com/your-username/your-private-repo" \\`
);
console.log('  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \\');
console.log('  -H "Content-Type: application/json"');
console.log("");
console.log("3. Test with invalid URL (should return 400):");
console.log(
  `curl -X GET "${BASE_URL}/api/repository/branches?repo_url=https://invalid-url.com/owner/repo" \\`
);
console.log('  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \\');
console.log('  -H "Content-Type: application/json"');
console.log("");

// Run the test
testBranchesEndpoint();
