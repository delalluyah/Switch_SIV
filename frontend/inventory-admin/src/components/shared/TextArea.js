import React from 'react'

const inputStyle = {
  width: '100%',
  padding: '4px 10px',
  height: '100px',
  marginBottom: '20px',
  marginTop: '5px',
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: '3px',
  resize: 'none',
}

export default ({
  onChange = () => {},
  value,
  placeholder = '',
  name,
  label,
}) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <br />
      <textarea
        style={inputStyle}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      >
        {value}
      </textarea>
    </div>
  )
}
