import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ClientWrapper from "./Client.style";
import ClientForm from "./ClientForm";
import ClientsList from "./ClientsList";
import {Button} from "antd"
import {history} from "../../history";
import config from "../../config/api"
import axios from 'axios'

class Client extends Component {
  handleClient=()=>{
    history.push("/clients/add");
  }
  handleLogout=()=>{
    axios.get(`${config.api.base_url}api/logout`, {params:{id:this.props.user.reset_token}}).then(response => {
      if (response.status == 200) {
        history.push("/");
      }
    })
  }
  render() {
    console.log(this.props)
    return (
      <ClientWrapper>
        <Switch>
          <Route exact path="/clients/view" component={ClientsList} />
          <Route exact path="/clients/add" component={ClientForm} />
          <Route
            exact
            path="/clients/edit"
            render={() => <ClientForm edit={true} />}
          />
        </Switch>
        {this.props.match.params.status=="view"?<Button onClick={this.handleClient} type="primary" style={{position:"absolute",top:"50%",right:"10%"}}>Add Client</Button>:null}
        <Button type="primary" onClick={this.handleLogout}>
              Log Out
            </Button>
      </ClientWrapper>
    );
  }
}



export default withRouter(Client);
