import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, DollarSign } from 'lucide-react'
import { supabase } from '../config/supabase'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Booking.css'

const Booking = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart()
  const { user, login, updateHasOrders, loading: authLoading } = useAuth()
  const [step, setStep] = useState(1) // 1: Payment, 2: Confirmation
  const [packageData, setPackageData] = useState(null)
  const [isCartCheckout, setIsCartCheckout] = useState(false)
  
  const [userData, setUserData] = useState(user)
  
  // Payment state - only cash payment accepted
  const [paymentMethod] = useState('cash') // Only cash payment
  const [processing, setProcessing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      setLoading(true)
      return
    }
    
    setLoading(false)
    
    // Check if user is logged in
    if (!user) {
      // If not logged in, redirect to login page
      navigate('/login', { state: { from: location } })
      return
    }

    // Set user data if logged in
    setUserData(user)

    // Check if this is a cart checkout
    if (searchParams.get('cart') === 'true') {
      setIsCartCheckout(true)
      if (cart.length === 0) {
        navigate('/cart')
      } else {
        setStep(1) // Go directly to payment
      }
    } else if (location.state?.package) {
      // Single package booking
      setPackageData(location.state.package)
      setIsCartCheckout(false)
      setStep(2) // Skip login step, go directly to payment
    } else {
      // If no package data, redirect to packages page
      navigate('/packages')
    }
  }, [location, navigate, searchParams, cart, user, authLoading])


  const handlePayment = async () => {
    setProcessing(true)

    try {
      const packagesToBook = isCartCheckout ? cart : (packageData ? [packageData] : [])
      const calculatedTotal = isCartCheckout ? getCartTotal() : (packageData ? parseFloat(packageData.price) : 0)

      // Create bookings for all packages (status: pending - waiting for admin approval)
      const bookings = []
      for (const pkg of packagesToBook) {
        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .insert([{
            user_id: userData.id,
            package_name: pkg.name,
            package_price: parseFloat(pkg.price),
            status: 'pending', // Orders start as pending, admin must approve or cancel
            created_at: new Date().toISOString()
          }])
          .select()
          .single()

        if (bookingError) throw bookingError
        bookings.push(booking)
      }

      // Create single payment record for all bookings
      // Cash payments status is 'pending' until payment is received at center
      const paymentStatus = 'pending'
      const transactionId = 'CASH-' + Date.now()
      
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert([{
          booking_id: bookings[0].id, // Link to first booking
          user_id: userData.id,
          amount: calculatedTotal,
          payment_method: 'cash',
          status: paymentStatus,
          transaction_id: transactionId,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (paymentError) throw paymentError
      
      // Bookings remain as 'pending' until admin confirms or cancels them

      // Update hasOrders in auth context
      await updateHasOrders()

      // Clear cart after successful payment
      if (isCartCheckout) {
        clearCart()
      }

             // Move to confirmation step
             setStep(2)
      setProcessing(false)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  // Show loading while auth is initializing or page is loading
  if (authLoading || loading) {
    return (
      <div className="booking-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (!isCartCheckout && !packageData) {
    return (
      <div className="booking-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  // Calculate total amount
  const packagesToShow = isCartCheckout ? cart : (packageData ? [packageData] : [])
  const totalAmount = isCartCheckout ? getCartTotal() : (packageData ? parseFloat(packageData.price) : 0)

  return (
    <main className="booking-main">
      <div className="booking-container">
        <div className="booking-header">
          <Link to={isCartCheckout ? "/cart" : "/packages"} className="back-link">
            <ArrowLeft size={20} />
            <span>{isCartCheckout ? "Back to Cart" : "Back to Packages"}</span>
          </Link>
          <h1>{isCartCheckout ? 'Checkout' : 'Book Health Package'}</h1>
          <div className="booking-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Payment</div>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Confirm</div>
            </div>
          </div>
        </div>

        <div className="booking-content">
          <div className="package-summary">
            <h3>{isCartCheckout ? 'Order Summary' : 'Package Details'}</h3>
            {isCartCheckout ? (
              <>
                {packagesToShow.map((pkg, index) => (
                  <div key={index} className="summary-package-item">
                    <div className="summary-item">
                      <span className="summary-label">Package {index + 1}:</span>
                      <span className="summary-value">{pkg.name}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Price:</span>
                      <span className="summary-value">${pkg.price}</span>
                    </div>
                  </div>
                ))}
                <div className="summary-item total">
                  <span className="summary-label">Total:</span>
                  <span className="summary-value">${totalAmount.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="summary-item">
                  <span className="summary-label">Package:</span>
                  <span className="summary-value">{packageData.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Price:</span>
                  <span className="summary-value">${packageData.price}</span>
                </div>
              </>
            )}
          </div>

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="booking-step">
              <h2>Payment Information</h2>
              <p>Pay in cash at our diagnostics center</p>
              
              <div className="payment-info-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <DollarSign size={32} style={{ color: 'var(--primary-color)' }} />
                  <h3>Cash Payment at Center</h3>
                </div>
                <p>You can pay in cash when you visit our diagnostics center for your tests.</p>
                <p><strong>Address:</strong> 123 Health Street, Medical District, City - 12345</p>
                <p><strong>Timings:</strong> Mon - Sat: 7:00 AM - 8:00 PM | Sunday: 8:00 AM - 2:00 PM</p>
                <p className="cash-note" style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                  <strong>Note:</strong> Your booking will be confirmed by admin after payment is received at the center.
                </p>
              </div>

              <div className="payment-summary">
                {isCartCheckout ? (
                  <>
                    {packagesToShow.map((pkg, index) => (
                      <div key={index} className="summary-row">
                        <span>{pkg.name}:</span>
                        <span>${pkg.price}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="summary-row">
                    <span>Package Price:</span>
                    <span>${packageData.price}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment} 
                className="btn btn-primary btn-large"
                disabled={processing}
              >
                {processing 
                  ? 'Processing...' 
                  : `Confirm Booking (Pay $${totalAmount.toFixed(2)} at Center)`
                }
              </button>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="booking-step confirmation">
              <div className="confirmation-icon">
                <CheckCircle size={64} />
              </div>
              <h2>Booking Submitted!</h2>
              <p>Your booking has been submitted successfully.</p>
              <p><strong>Please visit our center to complete cash payment.</strong></p>
              <p><strong>Address:</strong> 123 Health Street, Medical District, City - 12345</p>
              <p><strong>Timings:</strong> Mon - Sat: 7:00 AM - 8:00 PM | Sunday: 8:00 AM - 2:00 PM</p>
              <p><strong>Amount to Pay:</strong> ${totalAmount.toFixed(2)}</p>
              <p>Your order is pending admin approval. It will be confirmed once payment is received and verified at the center.</p>
              <p>You can check your order status in the Orders section. The admin will review and confirm or cancel your order.</p>
              
              <div className="confirmation-actions">
                <Link to="/orders" className="btn btn-primary">
                  View My Orders
                </Link>
                <Link to="/payment-history" className="btn btn-outline">
                  Payment History
                </Link>
                <Link to="/packages" className="btn btn-outline">
                  Book Another Package
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Booking
