import React, { Component } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import ClientWrapper from "./Register.style";
import { connect } from "react-redux";
import { addClient, updateClient } from "./RegisterAction";
import {history} from "../../history";
import axios from "axios";
import config from "../../config/api";

class Register extends Component {
  handleSubmit = (values) => {
    console.log("VALUES", values);
    let data = {
      name: values.client_name,
      company: values.client_company,
      username: values.client_contact,
      email: values.client_email,
      password: values.service_provided,
      created_by: this.props.LOGINREDUCER.USER.id,
    };
    if (this.props.edit) {
      this.props.updateClient(data);
    } else {
      this.props.addClient(data);
    }
    console.log("Data", data);
  };

  handleLogout=()=>{
    console.log(this.props.LOGINREDUCER.USER)
    axios.get(`${config.api.base_url}api/logout`, {params:{id:this.props.LOGINREDUCER.USER.reset_token}}).then(response => {
      if (response.status == 200) {
        history.push("/");
      }
    })
  }
  render() {
    console.log(this.props.edit, "EDIT");
    return (
      <ClientWrapper>
        <div className="form-container">
          <Form onFinish={this.handleSubmit}>
            <Row>
              <Col span={11}>
                <Form.Item
                  label="Client Name"
                  name="client_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Client Name!",
                    },
                  ]}
                >
                  <Input placeholder="Please input your Client Name!" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Client Company"
                  name="client_company"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Client Company!",
                    },
                  ]}
                >
                  <Input placeholder="Please input your Client Company!" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item
                  label="Client Email"
                  name="client_email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Client Email!",
                    },
                  ]}
                >
                  <Input placeholder="Please input your Client Email!" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Client Username"
                  name="client_contact"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Client Username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Please input your Client Contact Username!"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item
                  label="Client Password"
                  name="service_provided"
                  rules={[
                    {
                      required: true,
                      message: "Please input Client Password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Please Enter Clients Password"/>
                </Form.Item>
              </Col>
            </Row>
            {this.props.edit ? (
              <Form.Item wrapperCol={{ span: 22, offset: 15 }}>
                <Button type="primary" htmlType="submit">
                  Edit Client
                </Button>
              </Form.Item>
            ) : (
              <Form.Item wrapperCol={{ span: 22, offset: 15 }}>
                <Button type="primary" htmlType="submit">
                  Add Client
                </Button>
              </Form.Item>
            )}
            <Button type="primary" onClick={this.handleLogout}>
              Log Out
            </Button>
          </Form>
        </div>
      </ClientWrapper>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  addClient,
  updateClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
