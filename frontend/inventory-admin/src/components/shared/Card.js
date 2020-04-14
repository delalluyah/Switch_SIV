import React from 'react'

const cardStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  color: '#000',
  border: 'none',
  boxShadow: '0.5px 0.5px 10px 0.5px rgba(0,0,0,0.1)',
  minWidth: '50px',
  minHeight: '50px',
}
const headerStyle = {
  color: '#fff',
  backgroundColor: '#2ecc71',
  width: '100%',
  minHeight: '50px',
  fontSize: '15px',
  fontWeight: 'bold',
  paddingTop: '15px',
  textAlign: 'center',
}

const subtitleStyle = {
  fontSize: '14px',
  color: 'rgba(0,0,0,0.7)',
  textAlign: 'center',
}
const hrStyle = { color: '#000', opacity: '0.2', margin: '10px 0' }

export default ({ children, header, subtitle }) => {
  return (
    <div className="card" style={cardStyle}>
      {header && (
        <div className="header" style={headerStyle}>
          {header}
        </div>
      )}
      <div className="card-body" style={{ padding: '10px 15px' }}>
        {subtitle && (
          <>
            {' '}
            <p style={subtitleStyle}> {subtitle}</p> <hr style={hrStyle} />{' '}
          </>
        )}
        {children}
      </div>
    </div>
  )
}
