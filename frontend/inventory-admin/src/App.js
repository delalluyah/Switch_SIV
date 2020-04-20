import React, { useEffect } from 'react'
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
import DashboardHome from './components/dashboard/Dashboard-Home'
import ProductsDashboard from './components/products/Products-Dashboard'
import AddProduct from './components/products/AddProduct'
import ProductCategory from './components/products/AddProductCategory'

function App() {
  useEffect(() => {
    let x = setInterval(() => {
      if (utils.userTokenExpired(utils.getUserDetails())) {
        localStorage.removeItem('inventory_us_cred')
        store.dispatch({ type: actions.SET_CURRENT_USER, payload: {} })
      }
    }, 5000)
    return () => {
      clearInterval(x)
    }
  }, [])
  let user = utils.getUserDetails()
  store.dispatch({ type: actions.SET_CURRENT_USER, payload: user })
  return (
    <Provider store={store}>
      <AlertBox />
      <Router>
        <Switch>
          <Route exact path="/auth">
            <Login />
          </Route>
          <PrivateRoute
            exact
            path="/products"
            component={Dashboard}
            subComponent={ProductsDashboard}
          />
          <PrivateRoute
            exact
            path="/add-products"
            component={Dashboard}
            subComponent={AddProduct}
          />
          <PrivateRoute
            path="/add-category"
            component={Dashboard}
            subComponent={ProductCategory}
          />
          <PrivateRoute
            path="/"
            component={Dashboard}
            subComponent={DashboardHome}
          />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
