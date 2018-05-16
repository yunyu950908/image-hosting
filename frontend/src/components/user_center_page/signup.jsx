import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Checkbox, message } from 'antd';

import * as API from '../../request';
import { userSignup } from '../../redux/actions';
import { REMEMBER_ME, MESSAGE_ID } from '../../redux/constants';

const { Item } = Form;

class Signup extends Component {
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
        confirmPwd: PropTypes.shape({
          hasEnoughChars: PropTypes.bool.isRequired,
          hasNum: PropTypes.bool.isRequired,
          hasLowercase: PropTypes.bool.isRequired,
          hasUppercase: PropTypes.bool.isRequired,
          isSame: PropTypes.bool.isRequired,
        }),
      }),
      userInput: PropTypes.shape({
        email: PropTypes.string.isRequired,
        pwd: PropTypes.string.isRequired,
        confirmPwd: PropTypes.string.isRequired,
        securityCode: PropTypes.string.isRequired,
        messageId: PropTypes.string.isRequired,
      }),
    }),
    userSignup: PropTypes.func.isRequired,
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

  fetchUserSignup() {
    if (Signup.fetchLock) return message.warning('请勿频繁点击');
    const { validateInput, userInput } = this.props.validateState;
    // 确保邮箱，密码，邮箱验证码，送信id，同意注册协议都为真
    const isPwdAllTrue = Object.values(validateInput.pwd).every(v => v) && Object.values(validateInput.confirmPwd).every(v => v);
    const messageId = userInput.messageId || window.sessionStorage.getItem(MESSAGE_ID);
    if (!validateInput.email) {
      return message.error('email 地址错误，请检查后重试！');
    } else if (!isPwdAllTrue) {
      return message.error('注册密码有误，请检查后重试！');
    } else if (!messageId) {
      return message.error('请重新获取新的邮件验证码！');
    }
    const userInfo = {
      email: userInput.email,
      password: userInput.pwd,
      securityCode: userInput.securityCode,
      messageId: userInput.messageId,
    };
    if (!this.state[REMEMBER_ME]) return message.error('请同意注册协议后重试！');
    Signup.fetchLock = true;
    API.fetchSignup(userInfo)
      .then(({ data }) => {
        Signup.fetchLock = false;
        const { code, msg } = data;
        if (code !== 0) return message.error(msg);
        message.success('注册成功！');
        // 提交 action
        this.props.userSignup({ ...data.data, [REMEMBER_ME]: this.state[REMEMBER_ME] });
        this.props.replace('/user');
        window.location.reload();
        return null;
      })
      .catch((err) => {
        Signup.fetchLock = false;
        console.error(err);
        message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      });
    return null;
  }

  render() {
    return (
      <section id="Signup">
        <Item>
          <div className="d-flex">
            <Checkbox
              checked={this.state[REMEMBER_ME]}
              onChange={() => this.setState({ [REMEMBER_ME]: !this.state[REMEMBER_ME] })}
              style={{ marginRight: 8 }}
            />
            <Link href="/user/signup" to="/user/signup">我已同意《注册协议》</Link>
          </div>
        </Item>
        <Item>
          <div className="d-flex flex-column">
            <Button
              type="primary"
              style={{ marginBottom: 24 }}
              onClick={() => this.fetchUserSignup()}
            >
              戳我注册
            </Button>
            <Button onClick={() => this.props.replace('/user/login')}>返回登录</Button>
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

export default connect(mapStateToProps, { push, replace, userSignup })(Signup);
