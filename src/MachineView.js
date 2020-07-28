import React from 'react';
import { Card, Avatar, Col, Row, Typography, Space } from 'antd';
import {
  PictureOutlined,
  TagOutlined,
  HeartFilled,
  ToolFilled,
  AlertFilled,
} from '@ant-design/icons';

import MachineHealthGraph from './Machine Graphs/MachineHealthGraph.js';
import MachineInsightsGraph from './Machine Graphs/MachineInsightsGraph.js';

const { Text } = Typography;

function MachineView(props) {
  const { stats } = props;

  if (Object.keys(stats).length === 0) {
    return (
      <div className="cardView machine">
        <Card className="card">
          <Row>
            <Col span={8}>
              <Space direction="vertical">
                <Avatar shape="square" size={225} icon={<PictureOutlined />} />
                <Card className="category" size="small">
                  <TagOutlined />
                  {'  '}Categoria
                </Card>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <Text strong>Nome do Ativo</Text>
                <Text></Text>
                <Text strong>Data de Startup</Text>
                <Text></Text>
                <Text strong>Modelo</Text>
                <Text></Text>
                <Text strong>Descrição</Text>
                <Text></Text>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <Text strong>
                  {' '}
                  <span style={{ color: 'red' }}>
                    <HeartFilled />
                  </span>{' '}
                  Saúde
                </Text>
                <Text></Text>
                <Text strong>
                  <span style={{ color: 'orange' }}>
                    <AlertFilled />
                  </span>
                  Insights
                </Text>
                <Text></Text>
                <Text strong>
                  {' '}
                  <span style={{ color: 'gray' }}>
                    <ToolFilled />
                  </span>{' '}
                  Preventivas Realizadas
                </Text>
                <Text></Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="cardView machine">
        <Card className="card">
          <Row type="flex">
            <Col span={8}>
              <Space direction="vertical">
                <Avatar shape="square" size={225} src={stats.model.image} />
                <Card className="category" size="small">
                  <TagOutlined />
                  {'  '}
                  {stats.category.name}
                </Card>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <Text strong>Nome do Ativo</Text>
                <Text>{stats.name}</Text>
                <Text strong>Data de Startup</Text>
                <Text>{stats.startup}</Text>
                <Text strong>Modelo</Text>
                <Text>{stats.model.name}</Text>
                <Text strong>Descrição</Text>
                <Text>{stats.description}</Text>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <Text strong>
                  {' '}
                  <span style={{ color: 'red' }}>
                    <HeartFilled />
                  </span>{' '}
                  Saúde
                </Text>
                <MachineHealthGraph stats={stats.healthscore} />
                <Text strong>
                  <span style={{ color: 'orange' }}>
                    <AlertFilled />
                  </span>
                  Insights
                </Text>
                <MachineInsightsGraph stats={stats.insights} />
                <Text strong>
                  {' '}
                  <span style={{ color: 'gray' }}>
                    <ToolFilled />
                  </span>{' '}
                  Preventivas Realizadas
                  <span style={{ float: 'right' }}>
                    {stats.maintenances.length}
                  </span>
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default MachineView;
