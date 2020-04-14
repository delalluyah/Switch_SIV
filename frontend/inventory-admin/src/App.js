import React from 'react'
import './App.css'
import './components/layout/sidebar/SideBar'
import SideBar from './components/layout/sidebar/SideBar'
import Brand from './components/layout/header/brand/Brand'
import Navbar from './components/layout/header/navbar/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/login/Login'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/auth">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div id="side-bar">
        <SideBar />
      </div>
      <div id="brand">
        <Brand />
      </div>
      <div id="navbar">
        <Navbar />
      </div>
    </div>
  )
}

export default App
