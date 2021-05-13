import React from "react";
import DetailList from "./DetailList"

class CryptoList extends React.Component {
  render() {
    return <div>
    <h1>Hello, {this.props.name}</h1>
    <br></br>
    <DetailList></DetailList>
    </div>;
  }
}


export default CryptoList;