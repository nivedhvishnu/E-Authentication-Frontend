import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from "react-redux";
import { startLogin } from "./LoginActions";
import { history } from "../../history";
import LoginWrapper from "./Login.style";

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    // if (this.props.LOGINREDUCER.ISAUTH) {
    //   history.push("/clients/view")
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.LOGINREDUCER.ISAUTH) {
      history.push("/auth")
    }
  }

  handleSubmit = (values) => {
    if (values.email) {
      values.name = values.email.toLowerCase() + "@gmail.com"
    }
    // history.push("/clients/view")
    this.props.startLogin(values)
  }

  render() {
    return (
      <LoginWrapper>
          <h2 style={{display:"flex",position:"absolute",top:"25%",left:"42%"}}>E Authentication Login</h2>
        <div className="login-component" >
          <Form
            onFinish={this.handleSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input addonAfter="@gmail.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form >
        </div >
      </LoginWrapper >
    );
  }
}

function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = {
  startLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);