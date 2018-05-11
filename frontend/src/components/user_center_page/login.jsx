import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Checkbox, message } from 'antd';

import * as API from '../../request';
import { userLogin } from '../../redux/actions';
import { REMEMBER_ME } from '../../redux/constants';

const { Item } = Form;

class Login extends Component {
  static propTypes = {
    validateState: PropTypes.shape({
      validateInput: PropTypes.shape({
        email: PropTypes.bool.isRequired,
        pwd: PropTypes.shape({
          hasEnoughChars: PropTypes.bool.isRequired,
          hasNum: PropTypes.bool.isRequired,
          hasLowercase: PropTypes.bool.isRequired,
          hasUppercase: PropTypes.bool.isRequired,
        }),
      }),
      userInput: PropTypes.shape({
        email: PropTypes.string.isRequired,
        pwd: PropTypes.string.isRequired,
      }),
    }),
    userLogin: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    // push: PropTypes.func.isRequired,
  };

  static defaultProps = {
    validateState: {
      validateInput: {},
      userInput: {},
    },
  };

  static fetchLock = false;

  state = {
    [REMEMBER_ME]: true,
  };

  fetchUserLogin() {
    if (Login.fetchLock) return message.warning('请勿频繁点击');
    const { validateInput, userInput } = this.props.validateState;
    const isAllTrue = validateInput.email && Object.values(validateInput.pwd).every(v => v);
    if (!isAllTrue) return message.error('账号或密码错误！');
    const userInfo = {
      email: userInput.email,
      password: userInput.pwd,
    };
    Login.fetchLock = true;
    API.fetchLogin(userInfo)
      .then(({ data }) => {
        Login.fetchLock = false;
        const { code, msg } = data;
        if (code !== 0) return message.error(msg);
        message.success('登录成功！');
        // 提交 action
        this.props.userLogin({ ...data.data, [REMEMBER_ME]: this.state[REMEMBER_ME] });
        this.props.replace('/user');
        return null;
      })
      .catch((err) => {
        Login.fetchLock = false;
        console.error(err);
        message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      });
    return null;
  }

  render() {
    return (
      <section id="login">
        <Item>
          <div className="d-flex justify-content-between">
            <Checkbox
              checked={this.state[REMEMBER_ME]}
              onChange={() => this.setState({ [REMEMBER_ME]: !this.state[REMEMBER_ME] })}
            >
              记住我的登录状态
            </Checkbox>
            <Link href="/user/forget" to="/user/forget">忘记密码？</Link>
          </div>
        </Item>
        <Item>
          <div className="d-flex flex-column">
            <Button
              type="primary"
              style={{ marginBottom: 24 }}
              onClick={() => this.fetchUserLogin()}
            >
              戳我登录
            </Button>
            <Button onClick={() => this.props.replace('/user/signup')}>马上注册</Button>
          </div>
        </Item>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { validateState } = state;
  return { validateState };
};

export default connect(mapStateToProps, { push, replace, userLogin })(Login);
