import React from 'react'
import './sidebar.css'
import user from './user.svg'

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="user">
        <div className="avatar-container">
          <img alt="avatar" className="avatar" src={user} />
        </div>
        <div className="user-info">
          <p className="fullname">William Shakespeare</p>
          <p className="role">Administrator</p>
        </div>
      </div>
      <ul className="side-menu">
        <li className="side-menu-item active">
          <i className="fas fa-chart-line"></i> <a href="#">Dashboard</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-shopping-cart"></i>
          <a href="#">View Products</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-cart-plus"></i>
          <a href="#">Add New Products</a>
        </li>
        <li className="side-menu-parent">
          <ul>
            <p>
              {' '}
              <i className="fas fa-user-cog"></i> Users{' '}
              <i className="right fas fa-angle-down"></i>
            </p>
            <li className="side-menu-item side-menu-child">
              <i class="fas fa-users"></i>
              <a href="#">All Users</a>
            </li>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-user-plus"></i>
              <a href="#">Add New User</a>
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
              <i class="fas fa-list-ul"></i>
              <a href="#">Product Categories</a>
            </li>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-sliders-h"></i>
              <a href="#">Product Types</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
