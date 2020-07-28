import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function UnitBarGraph(props) {
  const { assetsData } = props;

  const options = {
    chart: {
      height: 415,
    },
    title: {
      text: 'Saúde de cada Ativo',
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Saúde: <b>{point.y}%</b>',
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    xAxis: {
      categories: [],
    },
    series: [
      {
        data: [],
        type: 'column',
      },
    ],
  };

  assetsData.forEach((asset) => {
    options.xAxis.categories.push(asset.name);
    options.series[0].data.push(asset.healthscore.health);
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default UnitBarGraph;
