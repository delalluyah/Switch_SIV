import React from 'react'
import './App.css'
import './components/layout/sidebar/SideBar'
import SideBar from './components/layout/sidebar/SideBar'
import Brand from './components/layout/header/brand/Brand'
function App() {
  return (
    <div className="App">
      <div id="side-bar">
        <SideBar />
      </div>
      <div id="brand">
        <Brand />
      </div>
    </div>
  )
}

export default App
