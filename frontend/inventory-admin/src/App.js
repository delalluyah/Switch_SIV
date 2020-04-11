import React from 'react'
import './App.css'
import './components/layout/sidebar/SideBar'
import SideBar from './components/layout/sidebar/SideBar'
import Brand from './components/layout/header/brand/Brand'
import Navbar from './components/layout/header/navbar/Navbar'
function App() {
  return (
    <div className="App">
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
