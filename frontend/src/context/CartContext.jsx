import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('health_packages_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('health_packages_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (packageItem) => {
    setCart((prevCart) => {
      // Check if package already exists in cart
      const exists = prevCart.find((item) => item.name === packageItem.name)
      if (exists) {
        return prevCart // Don't add duplicates
      }
      return [...prevCart, { ...packageItem, quantity: 1 }]
    })
  }

  const removeFromCart = (packageName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== packageName))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('health_packages_cart')
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0)
  }

  const getCartCount = () => {
    return cart.length
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

