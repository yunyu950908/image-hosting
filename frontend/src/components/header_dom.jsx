import React from 'react';
import { Menu, Icon } from 'antd';

import './header_dom.css';

const { SubMenu } = Menu;

const HeaderDOM = () => (
  <section id="header">
    <Menu
      // onClick={this.handleClick}
      // selectedKeys={[this.state.current]}
      selectedKeys={['home']}
      mode="horizontal"
    >
      <Menu.Item key="logo" disabled>
        渣渣图床
      </Menu.Item>
      <Menu.Item key="home">
        <Icon type="home" />首页
      </Menu.Item>
      <Menu.Item key="upload">
        <Icon type="cloud-upload-o" />我的上传
      </Menu.Item>
      <Menu.Item key="storage">
        <Icon type="setting" />存储设置
      </Menu.Item>
      <SubMenu title={<span><Icon type="user" />个人中心</span>}>
        <Menu.Item key="sign">注册</Menu.Item>
        <Menu.Item key="login">登录</Menu.Item>
      </SubMenu>
    </Menu>
  </section>
);

export default HeaderDOM;