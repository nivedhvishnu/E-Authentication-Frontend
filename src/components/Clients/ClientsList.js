import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchClients, searchClient, setEditClient } from "./ClientsAction";
import { Table, Input, Tooltip } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import ClientWrapper from "./Client.style";
import debounce from "lodash/debounce";
import {history} from "../../history";

class ClientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: true,
    };
    this.handleSearch = debounce(this.handleSearch, 800);
  }
  componentDidMount() {
    const _params = {
      page: this.state.page,
    };
    this.props.fetchClients(_params);
    // if(this.props.CLIENTREDUCER.CLIENTSDATA.length){
    //   this.setState({
    //     loading:false
    //   })
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    const _params = {
      page: this.state.page,
    };
    if (prevState.page !== this.state.page) this.props.fetchClients(_params);
  }

  handleSearch = (value) => {
    console.log("SE", value);
    let _params = {
      page: this.state.page,
    };
    if (value && value.length) {
      _params = {
        ..._params,
        name: value,
      };
      this.props.searchClient(_params);
    } else {
      this.props.fetchClients(_params);
    }
  };

  handleEdit = (index) => {
    let clientData = this.props.CLIENTREDUCER.CLIENTSDATA[index];
    this.props.setEditClient(clientData);
    history.push("/clients/edit");
  };

  render() {
    console.log(this.props.CLIENTREDUCER.CLIENTSDATA);
    const COLUMNS = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },

      {
        title: "Actions",
        render: (value, item, index) => (
          <div className="action-btns">
            <div className="action-btns edit">
              {/* <Link className="edit-btn" to={"/lead-automation/generic-emails/edit"}> */}
              <Tooltip title="Edit Client">
                <EditOutlined
                  onClick={() =>
                    this.handleEdit((this.state.page - 1) * 10 + index)
                  }
                  style={{ fontSize: "20px" }}
                />
              </Tooltip>
            </div>
          </div>
        ),
      },
    ];
    return (
      <ClientWrapper>
        <div className="clients-container">
          {/* <div className="search-component"> */}
            {/* <Input
              prefix={
                <SearchOutlined style={{ fontSize: 20, color: "#333" }} />
                // <Icon type="search" style={{ fontSize: 20, color: "#333" }} />
              }
              autoFocus={true}
              disabled={false}
              onChange={(event) => this.handleSearch(event.target.value)}
              placeholder="Search by Email Id"
            /> */}
            <h2 style={{display:'flex',justifyContent:"center",margin:"2% 0"}}>Registered Clients</h2>
          {/* </div> */}
          <Table
            columns={COLUMNS}
            dataSource={this.props.CLIENTREDUCER.CLIENTSDATA}
          />
        </div>
      </ClientWrapper>
    );
  }
}

const mapDispatchToProps = {
  fetchClients,
  searchClient,
  setEditClient,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList);
