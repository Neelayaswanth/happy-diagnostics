// Quick test script for authentication endpoints
// Run with: node test-auth-endpoints.js

const testSignup = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobile: '9999999999',
        password: 'test123',
        name: 'Test User',
        email: 'test@example.com'
      })
    })
    const data = await response.json()
    console.log('Signup Response:', response.status, data)
    return data
  } catch (error) {
    console.error('Signup Error:', error.message)
  }
}

const testLogin = async (mobile, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobile,
        password
      })
    })
    const data = await response.json()
    console.log('Login Response:', response.status, data)
    return data
  } catch (error) {
    console.error('Login Error:', error.message)
  }
}

// Run tests
console.log('Testing Authentication Endpoints...\n')
console.log('1. Testing Signup...')
testSignup().then(() => {
  console.log('\n2. Testing Login...')
  testLogin('9999999999', 'test123')
})

