import React from 'react'

const inputStyle = {
  width: '100%',
  padding: '4px 10px',
  height: '35px',
  marginBottom: '20px',
  marginTop: '5px',
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: '3px',
}

export default ({
  onChange = () => {},
  value,
  placeholder = '',
  name,
  type = 'text',
  label,
}) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <br />
      <input
        style={inputStyle}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
      />
    </div>
  )
}
