import React from "react";
import "./sidebar.css";
import user from "./user.svg";
import { Link } from "react-router-dom";

export default function SideBar({ fullname = "", role = "" }) {
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
        {/* <li className="side-menu-item active">
          <i className="fas fa-chart-line"></i> <a href="/">Dashboard</a>
        </li> */}
        <li className="side-menu-item">
          <i className="fas fa-cart-arrow-down"></i>
          <a href="/record-sales">Record Sales</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-shopping-cart"></i>
          <a href="/products">View Inventory</a>
        </li>
        <li className="side-menu-item">
          <i className="fas fa-cart-plus"></i>
          <a href="/sales-history">Sales History</a>
        </li>
      </ul>
    </div>
  );
}
