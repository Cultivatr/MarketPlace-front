import React from 'react'
import {Route, Redirect} from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
  let displayToken = JSON.parse(sessionStorage.getItem("loggedIn"));
 
return (
  <Route {...rest} render={(props) => (
    displayToken === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
  )} />
)
}
export default PrivateRoute;