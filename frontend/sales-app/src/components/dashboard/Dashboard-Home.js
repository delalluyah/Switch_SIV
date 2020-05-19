import React, { useState, useEffect } from "react";
import "./dashboard-home.css";
import MiniCard from "../shared/MiniCard";
import box from "./box.svg";
import product from "./product.svg";
import price from "./price.svg";
import utils from "../../utils";
import constants from "../constants";

export default function DashboardHome() {
  return <div className="dashboard-home"></div>;
}

const titleStyle = {
  textAlign: "center",
  fontSize: "1.1em",
  fontWeight: "500",
};
const summaryStyle = {
  marginBottom: "20px",
};
const Summary = ({ title, children }) => {
  return (
    <div className="summary" style={summaryStyle}>
      <p className="summary-title" style={titleStyle}>
        {title}
      </p>
      <div className="three-col">{children}</div>
    </div>
  );
};
