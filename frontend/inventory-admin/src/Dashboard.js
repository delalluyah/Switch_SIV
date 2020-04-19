import React from 'react'
import SideBar from './components/layout/sidebar/SideBar'
import Brand from './components/layout/header/brand/Brand'
import Navbar from './components/layout/header/navbar/Navbar'
import { connect } from 'react-redux'
import utils from './utils'

const Dashboard = ({ user, setMessage, children }) => {
  //setMessage(`Welcome, ${user.fullname}`)
  return (
    <div className="dashboard">
      <div id="side-bar">
        <SideBar fullname={user.fullname} role={user.role} />
      </div>
      <div id="brand">
        <Brand />
      </div>
      <div id="navbar">
        <Navbar />
      </div>
      <div id="main-body">{children}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  setMessage: utils.setMessage,
})(Dashboard)
