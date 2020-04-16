import React from 'react'
import './App.css'
import './components/layout/sidebar/SideBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/login/Login'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './components/PrivateRoute'
import AlertBox from './components/shared/alertbox/AlertBox'
import utils from './utils'
import actions from './store/actions'
import Dashboard from './Dashboard'

function App() {
  let user = utils.getUserDetails()
  store.dispatch({ type: actions.SET_CURRENT_USER, payload: user })
  //if (user.fullname) utils.setMessage(`Welcome, ${user.fullname}`)
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

export default App
