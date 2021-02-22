import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {history} from "../history";
import LoginComponent from "./Login/LoginComponent";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home/Home";
import Client from "./Clients/Client"

class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path="/auth"
              component={Home}
              isAuthenticated={this.props.LOGINREDUCER.ISAUTH}
              user={this.props.LOGINREDUCER.USER}
            />
            <Route
        path="/clients/:status"
        render={() => <Client user={this.props.LOGINREDUCER.USER} />}
      ></Route>
            <Route exact path="/login" render={() => <LoginComponent />} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Routes);
