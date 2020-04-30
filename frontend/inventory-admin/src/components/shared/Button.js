import React from 'react'
import './styles/button.css'

const buttonStyles = { position: 'relative' }

export default ({
  onClick = () => {},
  text,
  type,
  className = 'primary',
  icon,
  image,
  tooltip,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      style={buttonStyles}
    >
      {icon && <i className={`${icon}`}></i>}
      {image && (
        <img
          src={image}
          style={{
            height: '70%',
            width: 'auto',
            position: 'absolute',
            left: '5px',
            top: '5px',
          }}
          alt=""
        />
      )}
      {text}
    </button>
  )
}
