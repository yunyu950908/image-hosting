import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Row, Col, message } from 'antd';
import { connect } from 'react-redux';

import { updateHostSetting } from '../../redux/actions';
import { initLeancloud } from '../../utils/leancloud';
import * as API from '../../request';

const { Item } = Form;

class Setting extends Component {
  static propTypes = {
    userState: PropTypes.shape({
      email: PropTypes.string.isRequired,
      hostSetting: PropTypes.shape({
        leancloud: PropTypes.shape({}).isRequired,
        qiniu: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
    updateHostSetting: PropTypes.func.isRequired,
  };

  static itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  constructor(props) {
    super(props);
    const { hostSetting } = this.props.userState;
    this.keys = Object.keys(hostSetting);
    const editCtrl = {};
    this.keys.forEach((hostName) => {
      editCtrl[hostName] = true;
    });
    this.state = {
      editCtrl,
      lastEdit: JSON.parse(JSON.stringify(hostSetting)),
      hostSetting: JSON.parse(JSON.stringify(hostSetting)),
    };
  }

  // 编辑控制
  setEditCtrl(hostName, bool) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.editCtrl[hostName] = bool;
    this.setState(newState);
  }

  // 修改 hostSetting 配置
  setHostSetting(hostName, field, value) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.hostSetting[hostName][field] = value;
    this.setState(newState);
  }

  // 取消按钮
  handleCancelBtn(hostName) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.hostSetting = newState.lastEdit;
    newState.editCtrl[hostName] = true;
    this.setState(newState);
  }

  // 确定按钮
  handleSubmitBtn(hostName) {
    let flag = false;
    const hostSetting = this.state.hostSetting[hostName];
    const lastEdit = this.state.lastEdit[hostName];
    Object.keys(hostSetting).forEach((key) => {
      if (hostSetting[key] !== lastEdit[key]) flag = true;
    });
    if (flag) {
      this.fetchHostSetting(hostName);
    } else {
      this.handleCancelBtn(hostName);
    }
  }

  // 更新 hostSetting 请求
  fetchHostSetting(hostName) {
    (async () => {
      const hostConfig = this.state.hostSetting[hostName];
      let { data } = await API.fetchStore(hostName, hostConfig);
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      const { code, msg } = data;
      if (code !== 0) {
        message.error(msg);
        throw data;
      } else {
        message.success('配置成功！');
      }
      return data.data;
    })()
      .then((r) => {
        const { hostSetting } = r;
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.hostSetting = hostSetting;
        newState.lastEdit = hostSetting;
        newState.editCtrl[hostName] = true;
        this.setState(newState);
        this.props.updateHostSetting(hostSetting);
        const { APP_ID, APP_KEY } = hostSetting[hostName];
        const { email } = this.props.userState;
        initLeancloud(APP_ID, APP_KEY, email);
      })
      .catch((e) => {
        console.error(e);
        this.handleCancelBtn(hostName);
      });
  }

  render() {
    const cards = this.keys.map((hostName) => {
      const settingValue = this.state.hostSetting[hostName];
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
                value={settingValue.instanceName}
                disabled={this.state.editCtrl[hostName]}
                onChange={e => this.setHostSetting(hostName, 'instanceName', e.target.value)}
              />
            </Item>
            <Item
              {...Setting.itemLayout}
              label={KEY1}
              colon={false}
              required
            >
              <Input
                value={settingValue[KEY1]}
                disabled={this.state.editCtrl[hostName]}
                onChange={e => this.setHostSetting(hostName, KEY1, e.target.value)}

              />
            </Item>
            <Item
              {...Setting.itemLayout}
              label={KEY2}
              colon={false}
              required
            >
              <Input
                value={settingValue[KEY2]}
                disabled={this.state.editCtrl[hostName]}
                onChange={e => this.setHostSetting(hostName, KEY2, e.target.value)}

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
                  <Button style={{ width: '100%' }} onClick={() => this.handleCancelBtn(hostName)}>
                    取消
                  </Button>
                </Col>
                <Col span={11} offset={2}>
                  <Button
                    type="primary"
                    style={{ width: '100%' }}
                    onClick={() => this.handleSubmitBtn(hostName)}
                  >
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

export default connect(mapStateToProps, { updateHostSetting })(Setting);
