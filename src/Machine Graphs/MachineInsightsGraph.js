import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function MachineInsightsGraph(props) {
  const { stats } = props;
  const names = {
    checked: 'Verificados',
    pending: 'Não Verificados',
  };

  const options = {
    chart: {
      type: 'bar',
      height: 100,
    },
    title: {
      enabled: false,
      text: '',
    },
    xAxis: {
      visible: false,
      categories: [''],
    },
    yAxis: {
      visible: false,
      min: 0,
      max: 0,
      endOnTick: false,
      title: {
        enabled: false,
      },
    },
    legend: {
      inverted: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        pointWidth: 20,
        dataLabels: {
          enabled: true,
          inside: true,
          formatter: function () {
            if (this.series.data[0].y === 0) {
              return '';
            } else {
              return this.series.data[0].y;
            }
          },
        },
      },
    },
    series: [],
  };

  for (let key in names) {
    options.series.push({ name: names[key], data: [stats[key]] });
    options.yAxis.max += stats[key];
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default MachineInsightsGraph;
