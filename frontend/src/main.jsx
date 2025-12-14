import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('❌ Root element not found!')
  document.body.innerHTML = '<div style="padding: 40px; text-align: center;"><h1 style="color: red;">Error: Root element not found!</h1><p>Please check if index.html has a div with id="root"</p></div>'
} else {
  try {
    console.log('🚀 Starting React app...')
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('✅ React app rendered successfully')
  } catch (error) {
    console.error('❌ Error rendering app:', error)
    console.error('Error details:', error.message, error.stack)
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; background: #fee; border: 2px solid #f00; border-radius: 8px; margin: 20px;">
        <h1 style="color: #c00;">Error Loading Application</h1>
        <p style="color: #666;">${error.message}</p>
        <pre style="background: #fff; padding: 20px; text-align: left; overflow: auto;">${error.stack}</pre>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 20px;">
          Reload Page
        </button>
      </div>
    `
  }
}


