import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

import { userLogout } from '../redux/actions';

import './header_dom.css';

const { SubMenu, ItemGroup } = Menu;

class HeaderDOM extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    userState: PropTypes.shape({
      email: PropTypes.string,
    }),
  };

  static defaultProps = {
    userState: {
      email: '',
    },
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
      this.props.userLogout();
    }
    this.props.push(key);
  }

  render() {
    console.log(this.props.router);
    return (
      <section id="header">
        <Menu
          onClick={({ key }) => this.changeKey(key)}
          selectedKeys={[this.props.router.location.pathname]}
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
              <ItemGroup key="/user" title={this.props.userState.email}>
                <Menu.Item key="/user">修改信息</Menu.Item>
                <Menu.Item key="/user/logout">退出登录</Menu.Item>
              </ItemGroup> :
              <ItemGroup key="/user" title="暂未登录">
                <Menu.Item key="/user/signup">注册</Menu.Item>
                <Menu.Item key="/user/login">登录</Menu.Item>
                <Menu.Item key="/user/forget" style={{ display: 'none' }}>忘记密码</Menu.Item>
              </ItemGroup>
            }
          </SubMenu>
        </Menu>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userState: state.userState,
    router: state.router,
  };
};

export default connect(mapStateToProps, { push, userLogout })(HeaderDOM);
