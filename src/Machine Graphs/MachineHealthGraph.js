import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function MachineHealthGraph(props) {
  const { stats, palette } = props;

  const options = {
    chart: {
      type: 'bar',
      height: 50,
    },
    title: {
      enabled: false,
      text: '',
    },
    tooltip: {
      formatter: function () {
        if (this.series.name === 'Anti-Saúde') {
          return false;
        } else {
          return this.series.name;
        }
      },
    },
    xAxis: {
      visible: false,
      categories: [''],
    },
    yAxis: {
      visible: false,
      min: 0,
      max: 100,
      title: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        pointWidth: 20,
        colors: palette,
        dataLabels: {
          enabled: true,
          inside: true,
        },
      },
    },
    series: [],
  };

  options.series.push({
    name: 'Anti-Saúde',
    data: [100 - stats.health],
    color: palette[0],
    dataLabels: {
      enabled: false,
    },
    noTooltip: true,
  });
  options.series.push({
    name: 'Saúde',
    data: [stats.health],
    color: palette[1],
    dataLabels: {
      formatter: function () {
        let point = this.point;
        window.setTimeout(function () {
          point.dataLabel.attr({
            x: point.yBottom / 2 - 12.5,
          });
        });
        return this.series.data[0].y;
      },
    },
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default MachineHealthGraph;
