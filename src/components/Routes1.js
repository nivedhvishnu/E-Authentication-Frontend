import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import LoginComponent from "./Login/LoginComponent";
import Home from "./Home/Home";
import Register from "./Register/Register";

export const PrivateRoute = ({ render: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class Routes extends Component {
  render() {
    const IS_AUTH = this.props.LOGINREDUCER.ISAUTH;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" render={() => <LoginComponent />} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          {/* <PrivateRoute
            isAuth={IS_AUTH}
            path="/clients/view"
            render={() => <Home user={this.props.LOGINREDUCER.USER} />}
          /> */}
          <Route
            path="/auth"
            render={() => <Home user={this.props.LOGINREDUCER.USER} />}
          />
          <Route
            path="/home"
            render={() => <Register user={this.props.LOGINREDUCER.USER} />}
          />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Routes);
