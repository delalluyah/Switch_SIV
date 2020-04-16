import React from 'react'
import './App.css'
import './components/layout/sidebar/SideBar'
import SideBar from './components/layout/sidebar/SideBar'
import Brand from './components/layout/header/brand/Brand'
import Navbar from './components/layout/header/navbar/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/login/Login'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './components/PrivateRoute'
import AlertBox from './components/shared/alertbox/AlertBox'
function App() {
  return (
    <Provider store={store}>
      <AlertBox />
      <Router>
        <Switch>
          <Route exact path="/auth">
            <Login />
          </Route>
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
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
      <div id="main-body"></div>
    </div>
  )
}

export default App
