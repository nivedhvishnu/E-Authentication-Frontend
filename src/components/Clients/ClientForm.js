import React, { Component } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import ClientWrapper from "./Client.style";
import { connect } from "react-redux";
import {
  addClient,
  updateClient,
  setEditClient,
  fetchServices,
  fetchInvoices,
} from "./ClientsAction";
import {history} from "../../history";

class ClientForm extends Component {
  componentDidMount() {
    this.props.fetchServices();
    this.props.fetchInvoices();
  }
  componentWillUnmount() {
    this.props.setEditClient([]);
  }

  handleSubmit = (values) => {
    let data = {
      name: values.client_name,
      company: values.client_company,
      username: values.client_contact,
      email: values.client_email,
      password: values.service_provided,
      created_by: this.props.LOGINREDUCER.USER.id,
    };
    if (this.props.edit) {
      console.log(data)
      this.props.updateClient(data);
    } else {
      this.props.addClient(data);
    }
  };
  handleCancel = () => {
    history.push("/clients/view");
    this.props.setEditClient([]);
  };
  render() {
    return (
      <ClientWrapper>
        <div className="form-container">
        {this.props.edit?<h1 style={{display:'flex',justifyContent:"center"}}>Clients Edit Page</h1>:<h1 style={{display:'flex',justifyContent:"center"}}>Clients Register Page</h1>}
          <Form onFinish={this.handleSubmit}>
            <Row>
              <Col span={11}>
                <Form.Item
                  label="Client Name"
                  name="client_name"
                  initialValue={this.props.CLIENTREDUCER.EDITCLIENTDATA.name}
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
                  initialValue={this.props.CLIENTREDUCER.EDITCLIENTDATA.company}
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
                  initialValue={this.props.CLIENTREDUCER.EDITCLIENTDATA.email}
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
                  initialValue={this.props.CLIENTREDUCER.EDITCLIENTDATA.username}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Client Username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Please input your Client Username!"
                  />
                </Form.Item>
              </Col>
            </Row>
            {!this.props.edit?<Row>
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
            </Row>:null}
            {this.props.edit ? (
              <Form.Item wrapperCol={{ span: 22, offset: 15 }}>
                <Button type="primary" htmlType="submit">
                  Edit Client
                </Button>
                <Button
                  type="primary"
                  htmlType="cancel"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </Form.Item>
            ) : (
              <Form.Item wrapperCol={{ span: 22, offset: 15 }}>
                <Button type="primary" htmlType="submit">
                  Add Client
                </Button>
                <Button
                  type="primary"
                  htmlType="cancel"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </Form.Item>
            )}
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
  setEditClient,
  fetchServices,
  fetchInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);
