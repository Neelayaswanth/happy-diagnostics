import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  DollarSign, 
  MessageSquare, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { supabase } from '../../config/supabase'
import './Admin.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalPayments: 0,
    totalContacts: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      
      // Fetch bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')

      // Fetch payments
      const { data: payments } = await supabase
        .from('payments')
        .select('*')

      // Fetch users
      const { data: users } = await supabase
        .from('users')
        .select('*')

      // Fetch contacts
      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')

      const totalRevenue = payments?.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) || 0
      const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0

      setStats({
        totalBookings: bookings?.length || 0,
        pendingBookings,
        totalRevenue,
        totalUsers: users?.length || 0,
        totalPayments: payments?.length || 0,
        totalContacts: contacts?.length || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_username')
    localStorage.removeItem('admin_login_time')
    navigate('/admin/login')
  }

  const adminUsername = localStorage.getItem('admin_username') || 'Admin'

  return (
    <div className="admin-dashboard">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <p>Happy Diagnostics</p>
        </div>
        <nav className="admin-menu">
          <a 
            href="#overview" 
            className={`admin-menu-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveTab('overview')
              setSidebarOpen(false)
            }}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </a>
          <a 
            href="#bookings" 
            className={`admin-menu-link ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveTab('bookings')
              setSidebarOpen(false)
            }}
          >
            <ShoppingBag size={20} />
            <span>Bookings</span>
          </a>
          <a 
            href="#payments" 
            className={`admin-menu-link ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveTab('payments')
              setSidebarOpen(false)
            }}
          >
            <DollarSign size={20} />
            <span>Payments</span>
          </a>
          <a 
            href="#contacts" 
            className={`admin-menu-link ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveTab('contacts')
              setSidebarOpen(false)
            }}
          >
            <MessageSquare size={20} />
            <span>Contact Forms</span>
          </a>
          <a 
            href="#users" 
            className={`admin-menu-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveTab('users')
              setSidebarOpen(false)
            }}
          >
            <Users size={20} />
            <span>Users</span>
          </a>
          <a 
            href="#logout" 
            className="admin-menu-link"
            onClick={(e) => {
              e.preventDefault()
              handleLogout()
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </a>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <div>
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ display: 'none' }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'bookings' && 'Bookings Management'}
              {activeTab === 'payments' && 'Payments Management'}
              {activeTab === 'contacts' && 'Contact Submissions'}
              {activeTab === 'users' && 'Users Management'}
            </h1>
          </div>
          <div className="admin-user-info">
            <span>Welcome, <strong>{adminUsername}</strong></span>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <OverviewTab stats={stats} loading={loading} />
        )}
        {activeTab === 'bookings' && (
          <BookingsTab />
        )}
        {activeTab === 'payments' && (
          <PaymentsTab />
        )}
        {activeTab === 'contacts' && (
          <ContactsTab />
        )}
        {activeTab === 'users' && (
          <UsersTab />
        )}
      </main>
    </div>
  )
}

// Overview Tab Component
const OverviewTab = ({ stats, loading }) => {
  if (loading) {
    return <div className="loading">Loading statistics...</div>
  }

  return (
    <>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Bookings</div>
          <div className="admin-stat-value">{stats.totalBookings}</div>
        </div>
        <div className="admin-stat-card warning">
          <div className="admin-stat-label">Pending Bookings</div>
          <div className="admin-stat-value">{stats.pendingBookings}</div>
        </div>
        <div className="admin-stat-card success">
          <div className="admin-stat-label">Total Revenue</div>
          <div className="admin-stat-value">${stats.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Users</div>
          <div className="admin-stat-value">{stats.totalUsers}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Payments</div>
          <div className="admin-stat-value">{stats.totalPayments}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Contact Submissions</div>
          <div className="admin-stat-value">{stats.totalContacts}</div>
        </div>
      </div>

      <div className="admin-table-container">
        <h2>Recent Activity</h2>
        <p>Dashboard overview showing key metrics and statistics</p>
      </div>
    </>
  )
}

// Bookings Tab Component
const BookingsTab = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const { data: bookingsData, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Fetch user data for each booking
      const bookingsWithUsers = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          const { data: userData } = await supabase
            .from('users')
            .select('mobile, name, email')
            .eq('id', booking.user_id)
            .single()
          
          return {
            ...booking,
            users: userData || { mobile: 'N/A' }
          }
        })
      )

      setBookings(bookingsWithUsers)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      console.log('Updating booking:', bookingId, 'to status:', newStatus)
      
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      if (data && data.length > 0) {
        alert(`Booking ${newStatus} successfully!`)
        fetchBookings() // Refresh the bookings list
      } else {
        throw new Error('No booking was updated. Booking may not exist.')
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      alert(`Failed to update booking status: ${error.message || 'Unknown error'}`)
    }
  }

  if (loading) {
    return <div className="loading">Loading bookings...</div>
  }

  return (
    <div className="admin-table-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>All Bookings ({bookings.length})</h2>
        <button onClick={fetchBookings} className="btn btn-primary">
          Refresh
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Package Name</th>
            <th>User Mobile</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.id}</td>
                <td>{booking.package_name}</td>
                <td>{booking.users?.mobile || 'N/A'}</td>
                <td>${parseFloat(booking.package_price).toFixed(2)}</td>
                <td>
                  <span className={`admin-status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="admin-actions">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="admin-btn-small admin-btn-confirm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="admin-btn-small admin-btn-cancel"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                        className="admin-btn-small admin-btn-confirm"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// Payments Tab Component
const PaymentsTab = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const { data: paymentsData, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Fetch related data for each payment
      const paymentsWithDetails = await Promise.all(
        (paymentsData || []).map(async (payment) => {
          const [bookingData, userData] = await Promise.all([
            supabase
              .from('bookings')
              .select('package_name')
              .eq('id', payment.booking_id)
              .single(),
            supabase
              .from('users')
              .select('mobile, name')
              .eq('id', payment.user_id)
              .single()
          ])
          
          return {
            ...payment,
            bookings: bookingData.data || { package_name: 'N/A' },
            users: userData.data || { mobile: 'N/A' }
          }
        })
      )

      setPayments(paymentsWithDetails)
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading payments...</div>
  }

  const totalRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)

  return (
    <div className="admin-table-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>All Payments ({payments.length})</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>
            Total Revenue: <strong style={{ color: 'var(--secondary-color)', fontSize: '1.25rem' }}>${totalRevenue.toFixed(2)}</strong>
          </p>
        </div>
        <button onClick={fetchPayments} className="btn btn-primary">
          Refresh
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Package</th>
            <th>User Mobile</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                No payments found
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.transaction_id}</td>
                <td>{payment.bookings?.package_name || 'N/A'}</td>
                <td>{payment.users?.mobile || 'N/A'}</td>
                <td>${parseFloat(payment.amount).toFixed(2)}</td>
                <td>{payment.payment_method}</td>
                <td>
                  <span className={`admin-status-badge ${payment.status}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// Contacts Tab Component
const ContactsTab = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading contact submissions...</div>
  }

  return (
    <div className="admin-table-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Contact Submissions ({contacts.length})</h2>
        <button onClick={fetchContacts} className="btn btn-primary">
          Refresh
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                No contact submissions found
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td>#{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.subject}</td>
                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {contact.message}
                </td>
                <td>{new Date(contact.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// Users Tab Component
const UsersTab = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data: usersData, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Get counts for each user
      const usersWithCounts = await Promise.all(
        (usersData || []).map(async (user) => {
          const [bookingsCount, paymentsCount] = await Promise.all([
            supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
            supabase.from('payments').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
          ])
          return {
            ...user,
            bookings_count: bookingsCount.count || 0,
            payments_count: paymentsCount.count || 0
          }
        })
      )
      setUsers(usersWithCounts)

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="admin-table-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>All Users ({users.length})</h2>
        <button onClick={fetchUsers} className="btn btn-primary">
          Refresh
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mobile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registered</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.mobile}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <button className="admin-btn-small admin-btn-view">
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard

