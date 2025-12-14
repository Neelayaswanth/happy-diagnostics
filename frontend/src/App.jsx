import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import AdminRoute from './components/AdminRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Packages from './pages/Packages'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Booking from './pages/Booking'
import PaymentHistory from './pages/PaymentHistory'
import Orders from './pages/Orders'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
          <Routes>
            {/* Admin Routes (no navbar/footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            {/* Public Routes */}
            <Route path="/" element={
              <div className="App">
                <Navbar />
                <Home />
                <Footer />
              </div>
            } />
            <Route path="/services" element={
              <div className="App">
                <Navbar />
                <Services />
                <Footer />
              </div>
            } />
            <Route path="/packages" element={
              <div className="App">
                <Navbar />
                <Packages />
                <Footer />
              </div>
            } />
            <Route path="/about" element={
              <div className="App">
                <Navbar />
                <About />
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="App">
                <Navbar />
                <Contact />
                <Footer />
              </div>
            } />
            <Route path="/cart" element={
              <div className="App">
                <Navbar />
                <Cart />
                <Footer />
              </div>
            } />
            <Route path="/booking" element={
              <div className="App">
                <Navbar />
                <Booking />
                <Footer />
              </div>
            } />
            <Route path="/payment-history" element={
              <div className="App">
                <Navbar />
                <PaymentHistory />
                <Footer />
              </div>
            } />
            <Route path="/orders" element={
              <div className="App">
                <Navbar />
                <Orders />
                <Footer />
              </div>
            } />
            <Route path="/profile" element={
              <div className="App">
                <Navbar />
                <UserProfile />
                <Footer />
              </div>
            } />
            <Route path="/login" element={
              <div className="App">
                <Navbar />
                <Login />
                <Footer />
              </div>
            } />
          </Routes>
        </Router>
      </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
