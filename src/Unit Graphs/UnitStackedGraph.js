import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function UnitStackedGraph(props) {
  const { stats, palette } = props;
  const names = {
    insightsPending: 'Não Verificados',
    insightsChecked: 'Verificados',
  };

  const options = {
    chart: {
      type: 'bar',
      height: 165,
    },
    title: {
      text: 'Análise de Insights',
      y: 30,
    },
    xAxis: {
      categories: [''],
    },
    yAxis: {
      min: 0,
      max: 0,
      endOnTick: false,
      title: {
        enabled: false,
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
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

  options.series = Object.keys(names).map((key) => {
    let i = Object.keys(names).indexOf(key);

    options.yAxis.max += stats[key];

    return { name: names[key], data: [stats[key]], color: palette[i] };
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default UnitStackedGraph;
