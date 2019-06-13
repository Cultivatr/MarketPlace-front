import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  let displayToken = JSON.parse(sessionStorage.getItem("loggedIn"));
  let adminAuth = JSON.parse(sessionStorage.getItem("adminAuth"));
  let access = adminAuth && displayToken;
  return (
    <Route
      {...rest}
      render={props =>
        access === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
export default AdminRoute;
