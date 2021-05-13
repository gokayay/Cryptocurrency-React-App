import React from "react";
import DetailList from "./DetailList"

class CryptoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.coincap.io/v2/assets")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    return <div>
    <h1>Hello, {this.state.isLoaded}</h1>
    <br></br>
    <DetailList value={this.state.items}></DetailList>
    </div>;
  }
}


export default CryptoList;