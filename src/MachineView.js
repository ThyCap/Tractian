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
  const { stats, palette } = props;

  if (Object.keys(stats).length === 0) {
    return (
      <div className="cardView machine">
        <Card className="card">
          <Row type="flex" className="machineRow">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={6}
              xxl={4}
              className="avatarCol"
            >
              <Space direction="vertical">
                <Avatar
                  shape="square"
                  size={240}
                  style={{ maxWidth: '80vw', maxHeight: '80vw' }}
                  icon={<PictureOutlined />}
                />
                <Card className="category" size="small">
                  <b>
                    <TagOutlined />
                    Categoria
                  </b>
                </Card>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
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
            <Col xs={24} sm={24} md={24} lg={8} xl={12} xxl={16}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>
                  <span style={{ color: 'red' }}>
                    <HeartFilled />
                  </span>
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
                  <span style={{ color: 'gray' }}>
                    <ToolFilled />
                  </span>
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
          <Row type="flex" className="machineRow">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={6}
              xxl={4}
              className="avatarCol"
            >
              <Space direction="vertical">
                <Avatar
                  shape="square"
                  size={240}
                  style={{ maxWidth: '80vw', maxHeight: '80vw' }}
                  src={stats.model.image}
                />
                <Card className="category" size="small">
                  <b>
                    <TagOutlined />
                    {stats.category.name}
                  </b>
                </Card>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
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
            <Col xs={24} sm={24} md={24} lg={8} xl={12} xxl={16}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>
                  <span style={{ color: 'red' }}>
                    <HeartFilled />
                  </span>
                  Saúde
                </Text>
                <MachineHealthGraph
                  stats={stats.healthscore}
                  palette={[palette[0], palette[palette.length - 1]]}
                />
                <Text strong>
                  <span style={{ color: 'orange' }}>
                    <AlertFilled />
                  </span>
                  Insights
                </Text>
                <MachineInsightsGraph
                  stats={stats.insights}
                  palette={[palette[0], palette[palette.length - 1]]}
                />
                <Text strong>
                  <span style={{ color: 'gray' }}>
                    <ToolFilled />
                  </span>
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
