import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import UnitPieGraph from './Unit Graphs/UnitPieGraph.js';
import UnitBarGraph from './Unit Graphs/UnitBarGraph.js';
import UnitStackedGraph from './Unit Graphs/UnitStackedGraph.js';

const { Title } = Typography;

function UnitView(props) {
  const { unitStats } = props;

  return (
    <div className="cardView">
      <Card title={<Title level={4}>Overview da {unitStats.name}</Title>}>
        <Row>
          <Col span={12}>
            <UnitPieGraph stats={unitStats.data} />
            <UnitStackedGraph stats={unitStats.data} />
          </Col>
          <Col span={12}>
            <UnitBarGraph assetsData={unitStats.data.assetsData} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default UnitView;
