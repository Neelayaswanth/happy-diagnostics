// Quick test to check if routes are registered
import express from 'express'

const app = express()
app.use(express.json())

// Test route
app.post('/api/auth/signup', (req, res) => {
  res.json({ message: 'Route exists!' })
})

app.listen(5000, () => {
  console.log('Test server running on port 5000')
  console.log('Routes registered:', app._router.stack.map(r => r.route?.path).filter(Boolean))
})

