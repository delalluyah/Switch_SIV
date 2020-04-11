import React from 'react'
import './sidebar.css'

export default function SideBar() {
  return (
    <div className="sidebar">
      <ul className="side-menu">
        <li className="side-menu-item">
          <ul className="side-menu-parent">
            <p>
              {' '}
              Menu Item <i className="fas fa-angle-down"></i>
            </p>
            <li className="side-menu-item side-menu-child">
              <a href="#">
                Menu Item <i className="fas fa-chair"></i>
              </a>
            </li>
            <li className="side-menu-item side-menu-child">
              <a href="#">
                Menu Item <i className="fas fa-chair"></i>
              </a>
            </li>
          </ul>
        </li>
        <li className="side-menu-item">
          <a href="#">Menu Item</a>
          <i className="fas fa-chair"></i>
        </li>
        <li className="side-menu-item">
          <a href="#">
            Menu Item <i className="fas fa-chair"></i>
          </a>
        </li>
        <li className="side-menu-item">
          <a href="#">
            Menu Item <i className="fas fa-chair"></i>
          </a>
        </li>
        <li className="side-menu-item">
          <a href="#">
            Menu Item <i className="fas fa-chair"></i>
          </a>
        </li>
        <li className="side-menu-item">
          <a href="#">
            Menu Item <i className="fas fa-chair"></i>
          </a>
        </li>
        <li className="side-menu-item">
          <ul className="side-menu-parent">
            <p>
              {' '}
              Menu Item <i className="fas fa-angle-down"></i>
            </p>
            <li className="side-menu-item side-menu-child">
              <a href="#">
                Menu Item <i className="fas fa-chair"></i>
              </a>
            </li>
            <li className="side-menu-item side-menu-child">
              <a href="#">
                Menu Item <i className="fas fa-chair"></i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
