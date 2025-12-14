import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../config/supabase'
import { useAuth } from '../context/AuthContext'
import './Orders.css'

const Orders = () => {
  const navigate = useNavigate()
  const { user, hasOrders, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return
    
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/orders' } } })
      return
    }
    fetchOrders()
  }, [user, navigate, authLoading])

  const fetchOrders = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError('')

      // Fetch bookings (orders) for the logged-in user
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          *,
          payments (
            transaction_id,
            amount,
            payment_method,
            status,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Failed to load orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={20} className="status-icon confirmed" />
      case 'pending':
        return <Clock size={20} className="status-icon pending" />
      case 'cancelled':
        return <XCircle size={20} className="status-icon cancelled" />
      case 'completed':
        return <CheckCircle size={20} className="status-icon completed" />
      default:
        return <AlertCircle size={20} className="status-icon" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'confirmed'
      case 'pending':
        return 'pending'
      case 'cancelled':
        return 'cancelled'
      case 'completed':
        return 'completed'
      default:
        return ''
    }
  }

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <main className="orders-main">
        <div className="orders-container">
          <div className="loading">Loading...</div>
        </div>
      </main>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  if (loading) {
    return (
      <main className="orders-main">
        <div className="orders-container">
          <div className="loading">Loading orders...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="orders-main">
      <div className="orders-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track the status of your health package bookings</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="empty-orders">
            <Package size={64} />
            <h2>No Orders Found</h2>
            <p>You haven't placed any orders yet.</p>
            <Link to="/packages" className="btn btn-primary">
              Browse Packages
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-package-name">{order.package_name}</h3>
                    <div className="order-meta">
                      <span className="order-id">Order ID: #{order.id}</span>
                      <span className="order-date">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="order-detail-row">
                    <span className="detail-label">Package Price:</span>
                    <span className="detail-value">${parseFloat(order.package_price).toFixed(2)}</span>
                  </div>
                  
                  {order.payments && order.payments.length > 0 && (
                    <>
                      <div className="order-detail-row transaction-status-row">
                        <span className="detail-label">Transaction Status:</span>
                        <span className={`detail-value transaction-status-badge ${order.payments[0].status}`}>
                          {order.payments[0].status === 'pending' && <Clock size={16} />}
                          {order.payments[0].status === 'completed' && <CheckCircle size={16} />}
                          {order.payments[0].status === 'failed' && <XCircle size={16} />}
                          {order.payments[0].status === 'refunded' && <AlertCircle size={16} />}
                          <span>{order.payments[0].status.charAt(0).toUpperCase() + order.payments[0].status.slice(1)}</span>
                        </span>
                      </div>
                      <div className="order-detail-row">
                        <span className="detail-label">Transaction ID:</span>
                        <span className="detail-value">{order.payments[0].transaction_id}</span>
                      </div>
                      <div className="order-detail-row">
                        <span className="detail-label">Payment Method:</span>
                        <span className="detail-value">{order.payments[0].payment_method}</span>
                      </div>
                    </>
                  )}

                  {order.status === 'pending' && (
                    <div className="order-notice">
                      <Clock size={18} />
                      <span>Your order is pending admin approval. The admin will review and confirm or cancel your order.</span>
                    </div>
                  )}

                  {order.status === 'confirmed' && (
                    <div className="order-notice success">
                      <CheckCircle size={18} />
                      <span>Your order has been confirmed by admin. You will receive further instructions via SMS.</span>
                    </div>
                  )}

                  {order.status === 'cancelled' && (
                    <div className="order-notice error">
                      <XCircle size={18} />
                      <span>Your order has been cancelled. If payment was made, refund will be processed.</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="orders-footer">
          <Link to="/packages" className="btn btn-outline">
            Browse More Packages
          </Link>
          <Link to="/payment-history" className="btn btn-outline">
            View Payment History
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Orders

