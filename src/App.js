import React from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import { Layout, Menu, Select, Typography } from 'antd';

import MachineView from './MachineView.js';
import UnitView from './UnitView.js';
import './App.css';

import { LoadingOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Text } = Typography;

class App extends React.Component {
  state = {
    visibleKey: 1,
    options: [],
    selectedMachine: '',
    selectedMachineStats: {},
    loaded: false,
  };

  async componentDidMount() {
    const staticUrl =
      'https://tractian-data.s3.us-east-2.amazonaws.com/api.json';
    const base = '#7cb5ec';

    // Criar Paleta de cores para os gráficos
    const pieColors = [0, 1, 2, 3].map((num) => {
      return Highcharts.color(base)
        .brighten((num - 3) / 6)
        .get();
    });

    console.log(pieColors);

    // pegar as informações da fake API e ajustar o state
    await axios.get(staticUrl).then((res) =>
      this.setState(
        { ...this.state, data: res.data, loaded: true, palette: pieColors },
        () => {
          this.selectOptions();
          console.log(this.state);
        }
      )
    );
  }

  clickUnidade = (e) => {
    this.setState(
      {
        ...this.state,
        visibleKey: e.key,
        selectedMachine: '',
        selectedMachineStats: {},
      },
      () => {
        this.selectOptions();
        this.printOptions();
      }
    );
  };

  selectOptions = () => {
    const key = this.state.visibleKey;
    const units = this.state.data.units;

    const assetNames = units[key - 1].data.assetsData.map((asset) => {
      return asset.name;
    });

    this.setState({
      ...this.state,
      options: assetNames,
    });
  };

  printOptions = () => {
    const options = this.state.options;

    return options.map((option) => (
      <Option value={option} key={options.indexOf(option)}>
        {option}
      </Option>
    ));
  };

  onChange = (value) => {
    const units = this.state.data.units;
    const key = this.state.visibleKey;

    const [stats] = units[key - 1].data.assetsData.filter(
      (asset) => asset.name === value
    );

    this.setState({
      ...this.state,
      selectedMachine: value,
      selectedMachineStats: stats,
    });
  };

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }

  render() {
    if (this.state.loaded) {
      return (
        <div className="App">
          <Layout>
            <Header className="header">
              <img
                src="https://pcdn.piiojs.com/i/icmh4j/vw,1366,vh,0,r,0,pr,1,wp,1/%2F%2Ftractian.com%2Fwp-content%2Fuploads%2Flogo.png"
                alt="Tractian Logo"
              ></img>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={this.clickUnidade}>
                  Unidade 1
                </Menu.Item>
                <Menu.Item key="2" onClick={this.clickUnidade}>
                  Unidade 2
                </Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Content>
                <form id="machineForm">
                  <Select
                    showSearch
                    className="selectSearch"
                    value={
                      this.state.selectedMachine === ''
                        ? 'Escolha um ativo'
                        : this.state.selectedMachine
                    }
                    style={{ width: 300, marginTop: 10 }}
                    placeholder="Escolha um ativo"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.printOptions()}
                  </Select>
                </form>
              </Content>
              <Content>
                <MachineView
                  stats={this.state.selectedMachineStats}
                  palette={this.state.palette}
                />
              </Content>
              <Content>
                <UnitView
                  unitStats={this.state.data.units[this.state.visibleKey - 1]}
                  palette={this.state.palette}
                />
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Developed by Thyago Capitanio
              </Footer>
            </Layout>
          </Layout>
        </div>
      );
    } else {
      return (
        <div className="App loading">
          <Text strong style={{ fontSize: '20px' }}>
            Carregando Dados...
          </Text>
          <LoadingOutlined style={{ fontSize: '40px' }} />
        </div>
      );
    }
  }
}

export default App;
