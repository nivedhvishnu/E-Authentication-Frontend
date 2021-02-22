import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, isAuthenticated, user, ...rest }) => (
    <Route
        {...rest}
        render={props => (isAuthenticated === true ? <Component user={user} {...props} /> : <Redirect to="/" />)}
    />
);

export default PrivateRoute;