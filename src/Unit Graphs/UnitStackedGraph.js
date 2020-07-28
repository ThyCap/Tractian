import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function UnitStackedGraph(props) {
  const { stats } = props;
  const names = {
    insightsChecked: 'Verificados',
    insightsPending: 'Não Verificados',
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

export default UnitStackedGraph;
