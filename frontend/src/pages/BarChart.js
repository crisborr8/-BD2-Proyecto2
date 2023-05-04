import React from 'react';
import ReactApexChart from 'react-apexcharts';

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: props.data.map(item => {
            return item.valor;
          })
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: props.data.map(item => {
            return item.dato;
          })
        }
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        series: [
          {
            data: this.props.data.map(item => {
              return item.valor;
            })
          }
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.props.data.map(item => {
              return item.dato;
            })
          }
        }
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default BarChart;
