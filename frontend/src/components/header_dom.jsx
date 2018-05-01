import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

import './header_dom.css';

const { SubMenu, ItemGroup } = Menu;

class HeaderDOM extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      currentKey: '/',
    };
  }

  changeKey(key) {
    this.setState({
      currentKey: key,
    });
    this.props.push(key);
  }

  render() {
    return (
      <section id="header">
        <Menu
          onClick={({ key }) => this.changeKey(key)}
          selectedKeys={[this.state.currentKey]}
          mode="horizontal"
        >
          <Menu.Item key="logo" disabled>
            渣渣图床
          </Menu.Item>
          <Menu.Item key="/">
            <Icon type="home" />首页
          </Menu.Item>
          <Menu.Item key="/upload">
            <Icon type="cloud-upload-o" />我的上传
          </Menu.Item>
          <Menu.Item key="/storage">
            <Icon type="setting" />存储设置
          </Menu.Item>
          <SubMenu title={<span><Icon type="user" />个人中心</span>}>
            <ItemGroup key="g1" title="暂未登录">
              <Menu.Item key="/sign">注册</Menu.Item>
              <Menu.Item key="/login">登录</Menu.Item>
            </ItemGroup>
          </SubMenu>
        </Menu>
      </section>
    );
  }
}

export default connect(null, { push })(HeaderDOM);
