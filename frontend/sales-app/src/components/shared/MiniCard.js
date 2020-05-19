import React from 'react'
import './styles/minicard.css'

export default function MiniCard({
  title = 'Total Products',
  icon,
  theme = 'primary',
  value = '0.00',
}) {
  return (
    <div className={`mini-card ${theme}`}>
      <div className="mini-card-top">
        <img className="mini-card-icon" src={icon} alt="alt" />
        <p>{title}</p>
      </div>
      <div className="mini-card-bottom">
        <hr className="mini-card-separator" />
        {value}
      </div>
    </div>
  )
}
