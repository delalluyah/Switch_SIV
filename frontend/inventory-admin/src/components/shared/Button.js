import React from 'react'
import './styles/button.css'

const buttonStyles = {}

export default ({ onClick = () => {}, text, type, className = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      style={buttonStyles}
    >
      {text}
    </button>
  )
}
