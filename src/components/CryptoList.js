import React from "react";
import DetailList from "./DetailList"

class CryptoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      rates: []
    };
  }

  componentDidMount() {
    fetch("https://api.coincap.io/v2/assets")
      .then(res => res.json())
      .then(
        (result) => {
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
      fetch("https://api.coincap.io/v2/rates")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rates: result
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
    <h1>Cryptocurrencies {this.state.isLoaded}</h1>
    <br></br>
    <DetailList value={this.state.items} rates={this.state.rates}></DetailList>
    </div>;
  }
}


export default CryptoList;