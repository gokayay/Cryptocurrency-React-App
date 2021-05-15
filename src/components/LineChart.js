import React from "react";
import { Line } from 'react-chartjs-2';




class LineChart extends React.Component {

    data = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
          {
            label: '7 day change',
            data: [12, 19, 3, 5, 2, 3, 20],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          item: {}
        };
      }
    
      componentDidMount() {
        fetch(`https://api.coincap.io/v2/assets/${this.props.selectedCoin}/history?interval=d1`)
          .then(res => res.json())
          .then(
            (result) => {

        
              this.setState({
                isLoaded: true,
                item: result?.data?.filter((element, index, arr) => index > arr.length - 8 )
              });
              console.log(this.state.item);
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
      return <div><h1> LineChart</h1>
      <Line data={this.data} /></div>
      ;
    }
  }

export default LineChart;
