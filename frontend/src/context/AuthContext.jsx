import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasOrders, setHasOrders] = useState(false)

  useEffect(() => {
    // Initialize auth from localStorage
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user_data')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          await checkUserOrders(userData.id)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('user_data')
        }
      }
      setLoading(false)
    }
    
    initializeAuth()
  }, [])

  const checkUserOrders = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('user_id', userId)
        .limit(1)

      if (!error && data && data.length > 0) {
        setHasOrders(true)
      } else {
        setHasOrders(false)
      }
    } catch (error) {
      console.error('Error checking user orders:', error)
      setHasOrders(false)
    }
  }

  const login = async (userData) => {
    setUser(userData)
    localStorage.setItem('user_data', JSON.stringify(userData))
    await checkUserOrders(userData.id)
  }

  const logout = () => {
    setUser(null)
    setHasOrders(false)
    localStorage.removeItem('user_data')
  }

  const updateHasOrders = async () => {
    if (user) {
      await checkUserOrders(user.id)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasOrders, updateHasOrders }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

