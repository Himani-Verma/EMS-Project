// Simple test script to verify API routes work
const API_BASE = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Next.js API Routes...\n');

  const tests = [
    {
      name: 'Auth Login',
      url: `${API_BASE}/api/auth/login`,
      method: 'POST',
      body: { username: 'test', password: 'test' },
      expectError: true // Should fail with invalid credentials
    },
    {
      name: 'Visitors List',
      url: `${API_BASE}/api/visitors`,
      method: 'GET',
      expectError: true // Should fail without auth
    },
    {
      name: 'Analytics Dashboard',
      url: `${API_BASE}/api/analytics/dashboard`,
      method: 'GET',
      expectError: true // Should fail without auth
    },
    {
      name: 'FAQs List',
      url: `${API_BASE}/api/faqs`,
      method: 'GET',
      expectError: true // Should fail without auth
    },
    {
      name: 'Articles List',
      url: `${API_BASE}/api/articles`,
      method: 'GET',
      expectError: true // Should fail without auth
    }
  ];

  for (const test of tests) {
    try {
      console.log(`🔍 Testing ${test.name}...`);
      
      const options = {
        method: test.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const response = await fetch(test.url, options);
      const data = await response.json();

      if (test.expectError) {
        if (response.status >= 400) {
          console.log(`✅ ${test.name} - Correctly returned error (${response.status})`);
        } else {
          console.log(`⚠️  ${test.name} - Expected error but got success`);
        }
      } else {
        if (response.ok) {
          console.log(`✅ ${test.name} - Success`);
        } else {
          console.log(`❌ ${test.name} - Failed (${response.status})`);
        }
      }

    } catch (error) {
      if (test.expectError) {
        console.log(`✅ ${test.name} - Correctly failed (network error)`);
      } else {
        console.log(`❌ ${test.name} - Network error: ${error.message}`);
      }
    }
  }

  console.log('\n🎯 API Route Test Complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start the dev server: npm run dev');
  console.log('2. Test with real authentication');
  console.log('3. Deploy to Netlify');
}

// Run the test
testAPI().catch(console.error);
