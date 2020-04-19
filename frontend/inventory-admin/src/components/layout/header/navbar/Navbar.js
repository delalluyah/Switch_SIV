import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <nav className="navbar">
      <div className="logout-btn">
        <Link
          to="/auth"
          onClick={() => localStorage.removeItem('inventory_us_cred')}
        >
          Logout
        </Link>
      </div>
      <p className="nav-brand">Store Management Solution v1.0</p>
    </nav>
  )
}
