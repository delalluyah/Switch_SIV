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
        <li className="side-menu-parent">
          <ul className="">
            <p>
              {' '}
              Menu Item <span className="right fas fa-angle-down"></span>
            </p>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-chair"></i>
              <a href="#">Menu Item</a>
            </li>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-chair"></i>
              <a href="#">Menu Item</a>
            </li>
          </ul>
        </li>
        <li className="side-menu-item active">
          <i className="fas fa-chair"></i>
          <a href="#">Menu Item</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-chair"></i>
          <a href="#">Menu Item</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-chair"></i>
          <a href="#">Menu Item</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-chair"></i>
          <a href="#">Menu Item</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-chair"></i>
          <a href="#">Menu Item</a>
        </li>
        <li className="side-menu-parent">
          <ul className="">
            <p>
              {' '}
              Menu Item <i className="right fas fa-angle-down"></i>
            </p>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-chair"></i>
              <a href="#">Menu Item</a>
            </li>
            <li className="side-menu-item side-menu-child">
              <i className="fas fa-chair"></i>
              <a href="#">Menu Item</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
