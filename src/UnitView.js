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
        <Row type="flex">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <UnitPieGraph stats={unitStats.data} />
            <UnitStackedGraph stats={unitStats.data} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <UnitBarGraph assetsData={unitStats.data.assetsData} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default UnitView;
