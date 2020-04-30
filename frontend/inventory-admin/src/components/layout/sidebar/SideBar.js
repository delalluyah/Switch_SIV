import React from 'react'
import './sidebar.css'
import user from './user.svg'

export default function SideBar({ fullname = '', role = '' }) {
  return (
    <div className="sidebar">
      <div className="user">
        <div
          className="avatar-container"
          // style={{
          //   backgroundImage: `url("${user}")`,
          // }}
        >
          <img alt="avatar" className="avatar" src={user} />
        </div>
        <div className="user-info">
          <p className="fullname">{fullname}</p>
          <p className="role">{role}</p>
        </div>
      </div>
      <hr className="hr" />
      <ul className="side-menu">
        <li className="side-menu-item active">
          <i className="fas fa-chart-line"></i> <a href="/">Dashboard</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-shopping-cart"></i>
          <a href="/products">View Inventory</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-cart-plus"></i>
          <a href="/add-products">Add Stock</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-cart-plus"></i>
          <a href="/record-sales">Record Sales</a>
        </li>
        <li className="side-menu-parent">
          <ul>
            <p>
              {' '}
              <i className="fas fa-user-cog"></i> Users{' '}
              <i className="right fas fa-angle-down"></i>
            </p>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-users"></i>
              <a href="/users">All Users</a>
            </li>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-user-plus"></i>
              <a href="/add-user">Add New User</a>
            </li>
          </ul>
        </li>
        <li className="side-menu-parent">
          <ul>
            <p>
              {' '}
              <i className="fas fa-cog"></i>Configurations{' '}
              <i className="right fas fa-angle-down"></i>
            </p>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-list-ul"></i>
              <a href="/categories">Product Categories</a>
            </li>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-sliders-h"></i>
              <a href="/types">Product Types</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
