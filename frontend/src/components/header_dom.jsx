import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

import { deleteUserInfo } from '../redux/actions';

import './header_dom.css';

const { SubMenu, ItemGroup } = Menu;

class HeaderDOM extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    deleteUserInfo: PropTypes.func.isRequired,
    userState: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
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
    if (key === '/user/logout') {
      this.props.deleteUserInfo();
    }
    this.props.push(key);
  }

  render() {
    console.log(this.props);
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
          <Menu.Item key="/setting">
            <Icon type="setting" />存储设置
          </Menu.Item>
          <SubMenu title={<span><Icon type="user" />个人中心</span>}>
            {this.props.userState.email ?
              <ItemGroup key="user" title={this.props.userState.email}>
                <Menu.Item key="/user">修改信息</Menu.Item>
                <Menu.Item key="/user/logout">退出登录</Menu.Item>
              </ItemGroup> :
              <ItemGroup key="user" title="暂未登录">
                <Menu.Item key="/user/sign">注册</Menu.Item>
                <Menu.Item key="/user/login">登录</Menu.Item>
              </ItemGroup>
            }
          </SubMenu>
        </Menu>
      </section>
    );
  }
}

const mapStateToProps = state => ({ userState: state.userState });

export default connect(mapStateToProps, { push, deleteUserInfo })(HeaderDOM);
