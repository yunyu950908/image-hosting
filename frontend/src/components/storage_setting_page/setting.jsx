import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { connect } from 'react-redux';

const { Item } = Form;

class Setting extends Component {
  static propTypes = {
    userState: PropTypes.shape({
      hostSetting: PropTypes.shape({
        leancloud: PropTypes.shape({}).isRequired,
        qiniu: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
  };

  static itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  constructor(props) {
    super(props);
    this.hostSetting = this.props.userState.hostSetting;
    this.keys = Object.keys(this.hostSetting);
    const editCtrl = {};
    this.keys.forEach((hostName) => {
      editCtrl[hostName] = true;
    });
    this.state = {
      editCtrl,
    };
  }

  setEditCtrl(hostName, bool) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.editCtrl[hostName] = bool;
    this.setState(newState);
  }

  render() {
    const cards = this.keys.map((hostName) => {
      const settingValue = this.hostSetting[hostName];
      let KEY1 = '';
      let KEY2 = '';
      switch (hostName) {
        case 'leancloud':
          KEY1 = 'APP_ID';
          KEY2 = 'APP_KEY';
          break;
        case 'qiniu':
          KEY1 = 'AK';
          KEY2 = 'SK';
          break;
        default:
      }
      return (
        <Card
          key={hostName}
          title={hostName}
          extra={<a href={settingValue.host}>More</a>}
          bordered
          style={{ width: 360, marginRight: 40 }}
        >
          <Form layout="horizontal">
            <Item
              {...Setting.itemLayout}
              label="实例名"
              colon={false}
            >
              <Input
                defaultValue={settingValue.instanceName}
                disabled={this.state.editCtrl[hostName]}
              />
            </Item>
            <Item
              {...Setting.itemLayout}
              label="APP_ID"
              colon={false}
              required
            >
              <Input
                defaultValue={settingValue[KEY1]}
                disabled={this.state.editCtrl[hostName]}
              />
            </Item>
            <Item
              {...Setting.itemLayout}
              label="APP_KEY"
              colon={false}
              required
            >
              <Input
                defaultValue={settingValue[KEY2]}
                disabled={this.state.editCtrl[hostName]}
              />
            </Item>
            {this.state.editCtrl[hostName] ?
              <Row>
                <Col span={24}>
                  <Button
                    type="primary"
                    style={{ width: '100%' }}
                    onClick={() => this.setEditCtrl(hostName, false)}
                  >
                    编辑
                  </Button>
                </Col>
              </Row> :
              <Row>
                <Col span={11}>
                  <Button style={{ width: '100%' }} onClick={() => this.setEditCtrl(hostName, true)}>
                    取消
                  </Button>
                </Col>
                <Col span={11} offset={2}>
                  <Button type="primary" style={{ width: '100%' }}>
                    确定
                  </Button>
                </Col>
              </Row>
            }
          </Form>
        </Card>);
    });
    return (
      <section
        className="d-flex"
        style={{ padding: '0 64px' }}
      >
        {cards}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { userState } = state;
  return { userState };
};

export default connect(mapStateToProps)(Setting);
