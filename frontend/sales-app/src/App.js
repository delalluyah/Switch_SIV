import React, { useEffect } from "react";
import "./App.css";
import "./components/shared/styles/grid.css";
import "./components/layout/sidebar/SideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/login/Login";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/PrivateRoute";
import AlertBox from "./components/shared/alertbox/AlertBox";
import utils from "./utils";
import actions from "./store/actions";
import Dashboard from "./Dashboard";
import DashboardHome from "./components/dashboard/Dashboard-Home";
import ProductsDashboard from "./components/products/Products-Dashboard";
import AddProduct from "./components/products/AddProduct";
import ProductCategory from "./components/products/AddProductCategory";
import ProductCategories from "./components/products/ProductCategories";
import ProductTypes from "./components/products/ProductTypes";
import AddProductType from "./components/products/AddProductType";
import UpdateProductType from "./components/products/UpdateProductType";
import UpdateProductCategory from "./components/products/UpdateProductCategory";
import ProductDetails from "./components/products/ProductDetails";
import UpdateProduct from "./components/products/UpdateProduct";
import Users from "./components/users/Users";
import UpdateUser from "./components/users/UpdateUser";
import AddUser from "./components/users/AddUser";
import SalesDashboard from "./components/sales/SalesDashboard";
import constants from "./components/constants";
import SalesPreview from "./components/sales/SalesPreview/SalesPreview";
import SalesHistory from "./components/sales/SalesHistory/SalesHistory";
import SalesDetails from "./components/sales/SalesDetails/SalesDetails";

function App() {
  useEffect(() => {
    let x = setInterval(() => {
      if (utils.userTokenExpired(utils.getUserDetails())) {
        localStorage.removeItem(constants.user_token_name);
        store.dispatch({ type: actions.SET_CURRENT_USER, payload: {} });
      }
    }, 5000);
    return () => {
      clearInterval(x);
    };
  }, []);
  let user = utils.getUserDetails();
  store.dispatch({ type: actions.SET_CURRENT_USER, payload: user });
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
            path="/product/details/:id"
            component={Dashboard}
            subComponent={ProductDetails}
          />
          <PrivateRoute
            path="/product/update/:id"
            component={Dashboard}
            subComponent={UpdateProduct}
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
            path="/update-category/:id"
            component={Dashboard}
            subComponent={UpdateProductCategory}
          />
          <PrivateRoute
            path="/categories"
            component={Dashboard}
            subComponent={ProductCategories}
          />
          <PrivateRoute
            path="/add-type"
            component={Dashboard}
            subComponent={AddProductType}
          />
          <PrivateRoute
            path="/update-type/:id"
            component={Dashboard}
            subComponent={UpdateProductType}
          />
          <PrivateRoute
            path="/types"
            component={Dashboard}
            subComponent={ProductTypes}
          />
          <PrivateRoute
            exact
            path="/users"
            component={Dashboard}
            subComponent={Users}
          />
          <PrivateRoute
            exact
            path="/record-sales"
            component={Dashboard}
            subComponent={SalesDashboard}
          />
          <PrivateRoute
            exact
            path="/sales-history"
            component={Dashboard}
            subComponent={SalesHistory}
          />
          <PrivateRoute
            exact
            path="/preview-sales"
            component={Dashboard}
            subComponent={SalesPreview}
          />
          <PrivateRoute
            exact
            path="/Sales-Details/:id"
            component={Dashboard}
            subComponent={SalesDetails}
          />
          <PrivateRoute
            exact
            path="/update-user/:id"
            component={Dashboard}
            subComponent={UpdateUser}
          />
          <PrivateRoute
            exact
            path="/add-user/"
            component={Dashboard}
            subComponent={AddUser}
          />
          <PrivateRoute
            path="/"
            component={Dashboard}
            subComponent={DashboardHome}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
