import styled from "styled-components";

const ClientWrapper = styled.div`
  display: flex;
  width: 100%;
  .clients-container {
    width: 100%;
  }

  .search-component {
    display: flex;
    width: 80%;
    margin: 20px;
    .ant-input-affix-wrapper {
      border-radius: 25px;
      padding: 10px 30px 10px 45px !important;
      height: auto;
      color: #333;
    }
  }

  .ant-table-wrapper {
    margin: 0px 20px;
  }

  .ant-form {
    width: 100%;
  }

  .form-container {
    width: 100%;
    padding: 20px 10px;
  }

  .ant-col {
    margin: 10px;
  }
  .ant-form-item-control-input-content {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

export default ClientWrapper;
