import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({
  component: Component,
  subComponent: SUB,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true ? (
          <Component {...props}>
            <SUB />
          </Component>
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  )
}
const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps)(PrivateRoute)