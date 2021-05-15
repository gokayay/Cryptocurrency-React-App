import React from "react";
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

class LineChart extends React.Component {

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
                item: result
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
      <Line data={data} options={options} /></div>
      ;
    }
  }

export default LineChart;
