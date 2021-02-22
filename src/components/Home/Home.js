import React, { Component } from 'react';
import {Button,InputNumber,notification} from "antd";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import config from "../../config/api";
import { connect } from "react-redux";
import HomeWrapper from "./Home.style";
import QRCode from "qrcode.react";
import {history} from "../../history";
import Client from "../Clients/Client"

class Home extends Component {
  state={
    enableOTP:false,
    qrlink:"http://192.168.0.107:8081/api/",
    login:false,
    timer:0,
    otpnum:"",
    num1:"",
    num2:"",
    num3:"",
    num4:"",
  }
  // const [timer,setTimer] = useState(0); 
  requestOtp=()=>{
    axios.get(`${config.api.base_url}api/sendotp`,{params:{email:this.props.user.email}}).then(response=>{
      console.log(response)
      if(response.status==200){
        notification.success({
          message: "Success",
          description: "OTP has been sent to registered Email",
        });
      }else{
        notification.error({
          message: "Error",
          description: "Error Occured While Sending OTP",
        });
      }
    })
    this.setState({
      enableOTP:true
    })
  }

  handleOtp=()=>{
    axios.get(`${config.api.base_url}api/validateotp`,{params:{email:this.props.user.email,otp:this.state.num1+""+this.state.num2+""+this.state.num3+""+this.state.num4}}).then(response=>{
      console.log(response,"REs")
      if(response.status==200){
        notification.success({
          message: "Success",
          description: "Login SuccessFull",
        });
      }else{
        notification.error({
          message: "Error",
          description: "Invalid OTP",
        });
      }
      this.setState({
        login:response.data.login
      })
    }).catch(error=>{
      notification.error({
        message: "Error",
        description: "Invalid OTP",
      });
    })
  }
  handlenum1=(value)=>{
    this.setState({
      num1:value
    })
  }
  handlenum2=(value)=>{
    this.setState({
      num2:value
    })
  }
  handlenum3=(value)=>{
    this.setState({
      num3:value
    })
  }
  handlenum4=(value)=>{
    this.setState({
      num4:value
    })
  }

  componentDidMount(){
    let timerinterval =null
    timerinterval=setInterval(this.checkAuth,10*1000);
    this.setState({
      qrlink:this.state.qrlink+this.props.user.reset_token,
      timer:timerinterval
    })
  }
  
  componentDidUpdate(prevProps,prevState){
    console.log(prevState,"\n",this.state)
    if(this.state.login){
      history.push("/clients/view")
      clearInterval(this.state.timer)
    }else{

    }
  }
  componentWillUnmount(){
    clearInterval(this.state.timer);
  }

  checkAuth = ()=>{
    axios.get(`${config.api.base_url}api/validateotp`,{params:{email:this.props.user.email}}).then(response=>{
      console.log(response,"REs")
      this.setState({
        login:response.data.login
      })
    })
  }
  
  render() {
    return (
      <HomeWrapper>
        <div className="container">
          <div>
            <p>Click Here to send Otp to the registered Number</p>
            {this.state.enableOTP?<div><InputNumber onChange={this.handlenum1}/><InputNumber onChange={this.handlenum2}/><InputNumber onChange={this.handlenum3}/><InputNumber onChange={this.handlenum4}/></div>:null}
            <div style={{display:"flex",justifyContent: "space-around",marginTop:"10px"}}>{this.state.enableOTP?<Button onClick={this.handleOtp}>Verify OTP</Button>:null}<Button onClick={this.requestOtp}>Send OTP</Button></div>
          </div>
          <div>
          <h3>Please Scan the QR to Login</h3>
          <QRCode
            id="123456"
            value={this.state.qrlink}
            size={290}
            level={"H"}
            includeMargin={true}
          />
          </div>
        </div>
        {/* <Switch>
      <Route
        path="/clients/:status"
        render={() => <Client user={this.props.user} />}
      ></Route>
    </Switch> */}
      </HomeWrapper>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Home);