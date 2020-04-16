import React from 'react'
import './navbar.css'

export default () => {
  return (
    <nav className="navbar">
      <div className="logout-btn">
        <a
          href="/login"
          onClick={() => localStorage.removeItem('inventory_us_cred')}
        >
          Logout
        </a>
      </div>
      <p className="nav-brand">Store Management Solution v1.0</p>
    </nav>
  )
}
