import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Calendar, DollarSign, Lock, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../config/supabase'
import { useAuth } from '../context/AuthContext'
import './PaymentHistory.css'

const PaymentHistory = () => {
  const navigate = useNavigate()
  const { user, hasOrders, loading: authLoading } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Redirect if not logged in or has no orders
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return
    
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/payment-history' } } })
      return
    }
    if (!hasOrders) {
      // User is logged in but has no orders, show message
      setLoading(false)
    } else {
      fetchPayments()
    }
  }, [user, hasOrders, navigate, authLoading])

  const fetchPayments = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError('')

      // Fetch payments for the logged-in user
      const { data, error: fetchError } = await supabase
        .from('payments')
        .select(`
          *,
          bookings!payments_booking_id_fkey (
            package_name,
            package_price,
            status
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setPayments(data || [])
    } catch (err) {
      console.error('Error fetching payments:', err)
      setError('Failed to load payment history. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <main className="payment-history-main">
        <div className="payment-history-container">
          <div className="loading">Loading...</div>
        </div>
      </main>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  if (!hasOrders) {
    return (
      <main className="payment-history-main">
        <div className="payment-history-container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="empty-payment-history">
            <Lock size={64} />
            <h2>No Payment History</h2>
            <p>You haven't made any orders yet.</p>
            <p>Place an order to see your payment history here.</p>
            <Link to="/packages" className="btn btn-primary">
              Browse Packages
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="payment-history-main">
        <div className="payment-history-container">
          <div className="loading">Loading payment history...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="payment-history-main">
      <div className="payment-history-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="payment-history-header">
          <h1>Payment History</h1>
          <p>View all your past transactions and bookings</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <div className="empty-payment-history">
            <CreditCard size={64} />
            <h2>No Payments Found</h2>
            <p>You haven't made any payments yet.</p>
            <Link to="/packages" className="btn btn-primary">
              Browse Packages
            </Link>
          </div>
        ) : (
          <div className="payments-list">
            {payments.map((payment) => (
              <div key={payment.id} className="payment-card">
                <div className="payment-header">
                  <div className="payment-id">
                    <CreditCard size={20} />
                    <span>Transaction: {payment.transaction_id}</span>
                  </div>
                  <span className={`payment-status transaction-status-badge ${payment.status}`}>
                    {payment.status === 'pending' && <Clock size={16} />}
                    {payment.status === 'completed' && <CheckCircle size={16} />}
                    {payment.status === 'failed' && <XCircle size={16} />}
                    {payment.status === 'refunded' && <AlertCircle size={16} />}
                    <span>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                  </span>
                </div>
                <div className="payment-details">
                  <div className="payment-detail-item">
                    <Calendar size={18} />
                    <div>
                      <span className="detail-label">Date</span>
                      <span className="detail-value">
                        {new Date(payment.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="payment-detail-item">
                    <DollarSign size={18} />
                    <div>
                      <span className="detail-label">Amount</span>
                      <span className="detail-value">${parseFloat(payment.amount).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="payment-detail-item">
                    <span className="detail-label">Payment Method</span>
                    <span className="detail-value">{payment.payment_method}</span>
                  </div>
                  <div className="payment-detail-item transaction-status-item">
                    <span className="detail-label">Transaction Status</span>
                    <span className={`detail-value transaction-status-badge ${payment.status}`}>
                      {payment.status === 'pending' && <Clock size={16} />}
                      {payment.status === 'completed' && <CheckCircle size={16} />}
                      {payment.status === 'failed' && <XCircle size={16} />}
                      {payment.status === 'refunded' && <AlertCircle size={16} />}
                      <span>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                    </span>
                  </div>
                  {payment.bookings && (
                    <>
                      <div className="payment-detail-item">
                        <span className="detail-label">Package</span>
                        <span className="detail-value">{payment.bookings.package_name}</span>
                      </div>
                      <div className="payment-detail-item">
                        <span className="detail-label">Order Status</span>
                        <span className={`detail-value order-status ${payment.bookings.status}`}>
                          {payment.bookings.status.charAt(0).toUpperCase() + payment.bookings.status.slice(1)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default PaymentHistory
