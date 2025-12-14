import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, ShoppingCart, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart()
  const { user } = useAuth()

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }
    
    // Check if user is logged in
    if (!user) {
      // Redirect to login with return path
      navigate('/login', { state: { from: { pathname: '/cart' } } })
      return
    }
    
    // Navigate to booking page with cart data
    navigate('/booking?cart=true')
  }

  if (cart.length === 0) {
    return (
      <main className="cart-main">
        <div className="cart-container">
          <div className="cart-header">
            <Link to="/packages" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Packages</span>
            </Link>
            <h1>Shopping Cart</h1>
          </div>
          <div className="empty-cart">
            <ShoppingCart size={64} />
            <h2>Your cart is empty</h2>
            <p>Add health packages to your cart to get started</p>
            <Link to="/packages" className="btn btn-primary">
              Browse Packages
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-main">
      <div className="cart-container">
        <div className="cart-header">
          <Link to="/packages" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Packages</span>
          </Link>
          <h1>Shopping Cart</h1>
          <p className="cart-count">{cart.length} {cart.length === 1 ? 'package' : 'packages'} selected</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <h2>Selected Packages</h2>
              <button onClick={clearCart} className="clear-cart-btn">
                Clear All
              </button>
            </div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-content">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-features">
                    <p className="features-preview">
                      {item.features.slice(0, 3).join(', ')}
                      {item.features.length > 3 && ` +${item.features.length - 3} more`}
                    </p>
                  </div>
                  <div className="cart-item-price">${item.price}</div>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="remove-btn"
                  aria-label="Remove from cart"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({cart.length} {cart.length === 1 ? 'package' : 'packages'}):</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary btn-large checkout-btn">
              Proceed to Checkout
            </button>
            <Link to="/packages" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart
